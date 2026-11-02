// ---------------- word lists ----------------
const LITTLE = [
  ["cat","🐱"],["dog","🐶"],["sun","☀️"],["hat","🎩"],["bus","🚌"],["cow","🐮"],["pig","🐷"],["egg","🥚"],
  ["bee","🐝"],["car","🚗"],["fox","🦊"],["owl","🦉"],["ant","🐜"],["bat","🦇"],["hen","🐔"],["box","📦"],
  ["key","🔑"],["bug","🐛"],["cup","🥤"],["bed","🛏️"],["fish","🐟"],["frog","🐸"],["duck","🦆"],["cake","🎂"],
  ["moon","🌙"],["star","⭐"],["tree","🌳"],["ball","⚽"],["milk","🥛"],["boat","⛵"],["bear","🐻"],["lion","🦁"],
  ["kite","🪁"],["corn","🌽"],["book","📖"],["sock","🧦"],["shoe","👟"],["bird","🐦"],["door","🚪"],["nose","👃"],
];
const BIG = [
  ["rocket","🚀","It blasts off into space."],["pirate","🏴‍☠️","A sailor who hunts for treasure."],
  ["castle","🏰","A king and queen live here."],["dragon","🐉","A creature with wings that breathes fire."],
  ["jungle","🌴","A thick forest full of monkeys and vines."],["planet","🪐","Earth and Mars are both one of these."],
  ["rainbow","🌈","Colors in the sky after the rain."],["dolphin","🐬","A smart animal that swims and clicks."],
  ["penguin","🐧","A bird that cannot fly but loves to swim."],["volcano","🌋","A mountain that can erupt with lava."],
  ["giraffe","🦒","The animal with the longest neck."],["pumpkin","🎃","A big orange vegetable for Halloween."],
  ["library","📚","A place where you can borrow books."],["blanket","🛌","It keeps you warm in bed."],
  ["treasure","💰","Gold and jewels hidden in a chest."],["elephant","🐘","A huge animal with a trunk."],
  ["dinosaur","🦖","A giant reptile that lived long ago."],["umbrella","☂️","It keeps you dry in the rain."],
  ["sandwich","🥪","Food between two slices of bread."],["kangaroo","🦘","It hops and carries a baby in a pouch."],
  ["backpack","🎒","You carry your school things in it."],["birthday","🎉","The day you get one year older."],
  ["snowman","⛄","You build him in winter with a carrot nose."],["tornado","🌪️","A spinning storm of wind."],
  ["octopus","🐙","A sea animal with eight arms."],["pancake","🥞","A flat breakfast food with syrup."],
  ["skeleton","💀","All the bones inside your body."],["magnet","🧲","It sticks to metal like a fridge."],
  ["puzzle","🧩","Pieces you fit together to make a picture."],["garden","🌻","A place where flowers and vegetables grow."],
  ["island","🏝️","Land with water all around it."],["bridge","🌉","It lets you cross over a river."],
  ["spider","🕷️","It has eight legs and spins a web."],["wizard","🧙","Someone who does magic with a wand."],
  ["camera","📷","You use it to take pictures."],["cactus","🌵","A prickly plant that lives in the desert."],
  ["teacher","🧑‍🏫","The person who helps you learn at school."],["turtle","🐢","A slow animal that carries its shell."],
  ["monkey","🐒","It swings from trees and loves bananas."],["popcorn","🍿","A snack you eat at the movies."],
];
const LEVELS = {
  little: { name: "🐣 Little Kid", balloons: 8, list: LITTLE },
  big:    { name: "🚀 Big Kid",    balloons: 6, list: BIG },
};
// ---------------- everything the game says out loud ----------------
// Kept in one place so build.py can pre-record every phrase for the static site.
const AN = new Set("aefhilmnorsx");
const article = l => (AN.has(l) ? "an " : "a ") + l.toUpperCase();
const Say = {
  intro: (level, e) => level === "little"
    ? `Let's spell ${e.word}! Can you find the letters?`
    : `Your word has ${e.word.length} letters. Here's a clue: ${e.clue}`,
  hear: (level, e) => level === "little" ? e.word : e.clue,
  win: e => `Hooray! You did it! The word is ${e.word}!`,
  lose: e => `Oh no, all the balloons popped! The word was ${e.word}. Let's try another one!`,
  yes: (ch, count) => count > 1 ? `Yes! There are ${count} ${ch.toUpperCase()}'s!` : `Yes! There's ${article(ch)}!`,
  no: ch => `No ${ch.toUpperCase()}. Try again!`,
};

function allPhrases() {
  const out = new Set();
  for (const level of Object.keys(LEVELS)) {
    for (const [word, emoji, clue] of LEVELS[level].list) {
      const e = { word, emoji, clue };
      out.add(Say.intro(level, e)); out.add(Say.hear(level, e)); out.add(Say.win(e)); out.add(Say.lose(e));
      const counts = {};
      for (const c of word) counts[c] = (counts[c] || 0) + 1;
      for (const [c, n] of Object.entries(counts)) if (n > 1) out.add(Say.yes(c, n));
    }
  }
  for (const c of "abcdefghijklmnopqrstuvwxyz") { out.add(Say.yes(c, 1)); out.add(Say.no(c)); }
  return [...out];
}
