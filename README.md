# 🎈 Balloon Hangman

A kid-friendly hangman game with spoken words, using ElevenLabs text-to-speech. A bear floats on balloons, and each wrong guess pops one.

- **Little Kid (age 5):** words with a picture, and the word is read aloud.
- **Big Kid (age 8):** longer words with a spoken clue.

Each level has three difficulties. Tap the level badge at the top of the game to switch; winning 3 words in a row moves up one step automatically. The choice is remembered per level.

| | 🟢 Easy | 🟡 Medium | 🔴 Hard |
|---|---|---|---|
| Little Kid | 3 letters, 8 balloons | 4 letters, 7 balloons | 5 letters, 6 balloons |
| Big Kid | 5–6 letters, 7 balloons | 7–8 letters, 6 balloons | 9–10 letters, 5 balloons, clue costs a balloon |

Words are shuffled each round, and recently played words (remembered across visits) are held back so the same ones don't come back soon.

Live site: https://balloon-hangman.aruneshm.workers.dev

## Files

| File | What it is |
|------|------------|
| `public/index.html` | The game (page, styles, game logic) |
| `public/words.js` | Word lists and every phrase the game says out loud |
| `server.py` | Local server: serves the game and proxies ElevenLabs TTS |
| `build.py` | Builds the static site into `dist/` with all audio pre-recorded |
| `wrangler.jsonc` | Cloudflare deploy config (serves `dist/` as static files) |
| `.env` | `ELEVENLABS_API_KEY=...` (git-ignored, never deployed) |

## Play locally

```
cd ~/sw/hangman
python3 server.py
```

Then open http://127.0.0.1:8765. (It uses port 8765 because 8000 is taken on this machine. To pick another port, run `PORT=9000 python3 server.py`.)

The local server calls ElevenLabs as phrases are needed and caches each clip in `.tts_cache/`, so repeated phrases are free. If ElevenLabs is unavailable, the game falls back to the browser's built-in voice.

## Deploy to Cloudflare

```
cd ~/sw/hangman
python3 build.py        # records only new phrases; ones already recorded are reused
npx wrangler deploy
```

`build.py` copies `public/` into `dist/` and saves every phrase as an MP3 in `dist/audio/`, along with a `manifest.json` that maps each phrase to its file. The hosted site plays those files directly, so the API key is never uploaded and visitors can't spend ElevenLabs credits.

You need to be logged in to Cloudflare first: run `npx wrangler login` once, and check with `npx wrangler whoami`.

## Adding or changing words

Edit the `LITTLE` or `BIG` lists in `public/words.js`. A word's length decides its difficulty (the `len` ranges in `LEVELS`), so there's no need to tag it:

- Little: `["word", "emoji"]`
- Big: `["word", "emoji", "A short clue sentence."]`

Then rebuild and deploy as above. To change what the game says, edit the `Say` object in the same file. Every phrase change creates a new recording the next time you build.

## Voice

The default voice is ElevenLabs "Rachel" (`21m00Tcm4TlvDq8ikWAM`) with the `eleven_turbo_v2_5` model. To use another voice, add `ELEVENLABS_VOICE_ID=...` to `.env`, then rebuild. Changing the voice re-records every phrase (about 16k characters).
