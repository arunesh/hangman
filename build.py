#!/usr/bin/env python3
"""Build a fully static copy of the game into dist/, with every spoken phrase pre-recorded.

Run:  python3 build.py   then   npx wrangler pages deploy dist --project-name balloon-hangman
No API key ends up in dist/ — only MP3 files.
"""
import hashlib
import json
import shutil
import subprocess
from pathlib import Path

import server  # reuses the ElevenLabs call and its .tts_cache

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"

js = (ROOT / "public" / "words.js").read_text() + "\nconsole.log(JSON.stringify(allPhrases()));"
phrases = json.loads(subprocess.run(["node", "-e", js], capture_output=True, text=True, check=True).stdout)
print(f"{len(phrases)} phrases, {sum(map(len, phrases))} characters (cached ones are free)")

if DIST.exists():
    shutil.rmtree(DIST)
shutil.copytree(ROOT / "public", DIST)
(DIST / "audio").mkdir()

manifest = {}
for i, text in enumerate(phrases, 1):
    name = hashlib.sha1(text.encode()).hexdigest()[:16] + ".mp3"
    (DIST / "audio" / name).write_bytes(server.synthesize(text))
    manifest[text] = name
    if i % 25 == 0:
        print(f"  {i}/{len(phrases)}")
(DIST / "audio" / "manifest.json").write_text(json.dumps(manifest))
print("Done ->", DIST)
