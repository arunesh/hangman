 The game is live at https://balloon-hangman.aruneshm.workers.dev. I loaded the page, the word list and the audio files from that link, and all three come back fine. Anyone with the link can play it in a
  browser, on a tablet or phone too.

  How the speech works there: your ElevenLabs key isn't on Cloudflare at all. I recorded all 385 lines the game can say (about 16k characters) as MP3 files and uploaded them with the page. So there's nothing
  secret to leak, and visitors can't use up your ElevenLabs credits.

  Things to know
  - Cloudflare setup: I deployed with Cloudflare's CLI. Wrangler set this up as a Worker that only serves files, not a classic Pages project, so the address ends in .workers.dev. It created wrangler.jsonc in the
    project folder for this.
  - Your quota: your ElevenLabs key can't show the account quota, so I couldn't check your balance. The recording finished without errors.
  - The local version still works the same way (python3 server.py).

  To update after changing words or phrases:
  cd ~/sw/hangman
  python3 build.py        # records only new phrases; ones already recorded are reused
  npx wrangler deploy
------------------------------------------------------------------------------------------------------------------------

⏺ The hangman game is running, and I've opened it in your browser at http://127.0.0.1:8765. ElevenLabs speech works: I tested one phrase and got audio back.

  How it plays
  - Little Kid (age 5): 3–4 letter words with a big picture (🐱 cat, 🐸 frog…). The game says the word out loud ("Let's spell cat!") and there's a "Hear the word" button. They get 8 wrong guesses.
  - Big Kid (age 8): 5–8 letter words with a written clue that's also read aloud ("It blasts off into space…"). They get 6 wrong guesses.
  - Every tap gets spoken feedback ("Yes! There's a T!" or "No B. Try again!"). Winning gives confetti, a spoken cheer and a star. Each level keeps its own star count.                                                                   
  - For the little one I swapped the gallows for a bear floating on balloons. Each wrong guess pops a balloon, and when they're all gone the bear lands softly on the grass.
  - It has big tap-friendly letter buttons, a mute button, and works with a real keyboard too (Enter goes to the next word).

  Things to know
  - Port: another Python program of yours was already using port 8000. I didn't touch it and used 8765 instead.
  - API key: only the ELEVENLABS_API_KEY line was copied, into /Users/arunesh/sw/hangman/.env. It stays on the local server and never reaches the browser.
  - Cost: each spoken phrase is saved to disk the first time, so repeats don't use ElevenLabs credits again. If ElevenLabs fails, the game falls back to the browser's built-in voice.
  - Restarting: the server stops when this session ends. To start it again, run cd ~/sw/hangman && python3 server.py.

  The code is in two files: server.py and public/index.html. The word lists are at the top of the script in index.html if you want to add words the kids know.


