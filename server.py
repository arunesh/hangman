#!/usr/bin/env python3
"""Local hangman server. Serves the game and proxies ElevenLabs TTS so the API key stays off the browser.

Run:  python3 server.py   then open http://localhost:8765
"""
import hashlib
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CACHE = ROOT / ".tts_cache"
CACHE.mkdir(exist_ok=True)
PORT = int(os.environ.get("PORT", "8765"))

# Friendly, clear voice from the ElevenLabs default library ("Rachel"). Override with ELEVENLABS_VOICE_ID.
VOICE_ID = "21m00Tcm4TlvDq8ikWAM"
MODEL_ID = "eleven_turbo_v2_5"


def load_env():
    env_file = ROOT / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            if "=" in line and not line.strip().startswith("#"):
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_env()
API_KEY = os.environ.get("ELEVENLABS_API_KEY", "")
VOICE_ID = os.environ.get("ELEVENLABS_VOICE_ID", VOICE_ID)


def synthesize(text: str) -> bytes:
    """Return MP3 bytes for text, using a disk cache so repeated phrases are free."""
    key = hashlib.sha1(f"{VOICE_ID}|{MODEL_ID}|{text}".encode()).hexdigest()
    path = CACHE / f"{key}.mp3"
    if path.exists():
        return path.read_bytes()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}?output_format=mp3_44100_128",
        data=json.dumps({
            "text": text,
            "model_id": MODEL_ID,
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
        }).encode(),
        headers={"xi-api-key": API_KEY, "Content-Type": "application/json", "Accept": "audio/mpeg"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        audio = resp.read()
    path.write_bytes(audio)
    return audio


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / "public"), **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path != "/api/tts":
            return super().do_GET()
        text = urllib.parse.parse_qs(parsed.query).get("text", [""])[0].strip()[:300]
        if not text or not API_KEY:
            self.send_error(400 if not text else 503, "No text" if not text else "No ElevenLabs key")
            return
        try:
            audio = synthesize(text)
        except urllib.error.HTTPError as e:
            print("ElevenLabs error:", e.code, e.read()[:300])
            self.send_error(502, "TTS failed")
            return
        except Exception as e:  # network trouble etc.
            print("TTS error:", e)
            self.send_error(502, "TTS failed")
            return
        self.send_response(200)
        self.send_header("Content-Type", "audio/mpeg")
        self.send_header("Content-Length", str(len(audio)))
        self.send_header("Cache-Control", "max-age=86400")
        self.end_headers()
        self.wfile.write(audio)

    def log_message(self, fmt, *args):
        pass  # keep the terminal quiet


if __name__ == "__main__":
    if not API_KEY:
        print("Warning: ELEVENLABS_API_KEY not set; the game will fall back to the browser's built-in voice.")
    print(f"Hangman is running at http://localhost:{PORT}  (Ctrl+C to stop)")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
