// ---------------- word lists ----------------
// Each level picks words by length for its difficulty (see LEVELS below), so adding
// a word here automatically puts it in the right Easy / Medium / Hard group.
const LITTLE = [
  // 3 letters (Easy)
  ["cat","🐱"],["dog","🐶"],["sun","☀️"],["hat","🎩"],["bus","🚌"],["cow","🐮"],["pig","🐷"],["egg","🥚"],
  ["bee","🐝"],["car","🚗"],["fox","🦊"],["owl","🦉"],["ant","🐜"],["bat","🦇"],["hen","🐔"],["box","📦"],
  ["key","🔑"],["bug","🐛"],["cup","🥤"],["bed","🛏️"],["bow","🎀"],["pie","🥧"],["ram","🐏"],["web","🕸️"],
  ["cap","🧢"],["map","🗺️"],["van","🚐"],["ice","🧊"],
  // 4 letters (Medium)
  ["fish","🐟"],["frog","🐸"],["duck","🦆"],["cake","🎂"],["moon","🌙"],["star","⭐"],["tree","🌳"],["ball","⚽"],
  ["milk","🥛"],["boat","⛵"],["bear","🐻"],["lion","🦁"],["kite","🪁"],["corn","🌽"],["book","📖"],["sock","🧦"],
  ["shoe","👟"],["bird","🐦"],["door","🚪"],["nose","👃"],["crab","🦀"],["deer","🦌"],["goat","🐐"],["worm","🪱"],
  ["leaf","🍃"],["rose","🌹"],["bell","🔔"],["drum","🥁"],["gift","🎁"],["ship","🚢"],["taxi","🚕"],["seal","🦭"],
  ["wolf","🐺"],["kiwi","🥝"],["pear","🍐"],["rain","🌧️"],["hand","✋"],["foot","🦶"],
  // 5 letters (Hard)
  ["apple","🍎"],["horse","🐴"],["train","🚂"],["clock","⏰"],["snake","🐍"],["house","🏠"],["bread","🍞"],["chair","🪑"],
  ["cloud","☁️"],["shark","🦈"],["zebra","🦓"],["sheep","🐑"],["mouse","🐭"],["tiger","🐯"],["plane","✈️"],["truck","🚚"],
  ["grape","🍇"],["pizza","🍕"],["robot","🤖"],["crown","👑"],["whale","🐳"],["ghost","👻"],["snail","🐌"],["juice","🧃"],
  ["lemon","🍋"],["heart","❤️"],
];
const BIG = [
  // 5–6 letters (Easy)
  ["rocket","🚀","It blasts off into space."],["pirate","🏴‍☠️","A sailor who hunts for treasure."],
  ["castle","🏰","A king and queen live here."],["dragon","🐉","A creature with wings that breathes fire."],
  ["jungle","🌴","A thick forest full of monkeys and vines."],["planet","🪐","Earth and Mars are both one of these."],
  ["magnet","🧲","It sticks to metal like a fridge."],["puzzle","🧩","Pieces you fit together to make a picture."],
  ["garden","🌻","A place where flowers and vegetables grow."],["island","🏝️","Land with water all around it."],
  ["bridge","🌉","It lets you cross over a river."],["spider","🕷️","It has eight legs and spins a web."],
  ["wizard","🧙","Someone who does magic with a wand."],["camera","📷","You use it to take pictures."],
  ["cactus","🌵","A prickly plant that lives in the desert."],["turtle","🐢","A slow animal that carries its shell."],
  ["monkey","🐒","It swings from trees and loves bananas."],["piano","🎹","An instrument with black and white keys."],
  ["queen","👸","She wears a crown and rules a kingdom."],["candle","🕯️","It has a little flame and melts slowly."],
  ["anchor","⚓","It keeps a ship from floating away."],["violin","🎻","You play it with a bow under your chin."],
  ["mitten","🧤","It keeps your hand warm in the snow."],["tomato","🍅","A red fruit that goes in salad and ketchup."],
  ["carrot","🥕","An orange vegetable that rabbits love."],["banana","🍌","A long yellow fruit that you peel."],
  ["cookie","🍪","A sweet round treat, great with milk."],["parrot","🦜","A colorful bird that can copy words."],
  ["rabbit","🐇","An animal with long ears that hops."],["hammer","🔨","A tool for hitting nails."],
  ["koala","🐨","A sleepy animal that hugs trees in Australia."],["eagle","🦅","A big bird with sharp eyes."],
  // 7–8 letters (Medium)
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
  ["skeleton","💀","All the bones inside your body."],["teacher","🧑‍🏫","The person who helps you learn at school."],
  ["popcorn","🍿","A snack you eat at the movies."],["unicorn","🦄","A magic horse with a horn."],
  ["mermaid","🧜","Half person and half fish."],["cupcake","🧁","A tiny cake in a paper cup."],
  ["lobster","🦞","A red sea animal with big claws."],["peacock","🦚","A bird with a fancy tail of feathers."],
  ["scooter","🛴","You stand on it and push with one foot."],["trumpet","🎺","A shiny horn you blow into."],
  ["compass","🧭","It shows which way is north."],["mushroom","🍄","It grows in the forest and looks like a tiny umbrella."],
  ["airplane","✈️","It flies people across the sky."],["flamingo","🦩","A pink bird that stands on one leg."],
  ["hedgehog","🦔","A small animal covered in prickles."],["squirrel","🐿️","It gathers nuts and has a bushy tail."],
  ["mountain","⛰️","A very, very tall hill."],["computer","💻","You type and play games on it."],
  ["ladybug","🐞","A little red bug with black spots."],
  // 9–10 letters (Hard)
  ["butterfly","🦋","An insect with big colorful wings."],["crocodile","🐊","A reptile with lots of sharp teeth."],
  ["astronaut","🧑‍🚀","A person who travels to space."],["telescope","🔭","You use it to look at the stars."],
  ["hamburger","🍔","A meat patty in a bun."],["helicopter","🚁","It flies with spinning blades on top."],
  ["strawberry","🍓","A red fruit with seeds on the outside."],["watermelon","🍉","A big green fruit that is red inside."],
  ["skateboard","🛹","A board with wheels that you ride."],["chocolate","🍫","A sweet brown treat made from cocoa."],
  ["sunflower","🌻","A tall yellow flower that faces the sun."],["fireworks","🎆","Bright colors that boom in the night sky."],
  ["microscope","🔬","It makes tiny things look big."],["toothbrush","🪥","You use it to clean your teeth."],
  ["basketball","🏀","You bounce it and shoot it into a hoop."],["parachute","🪂","It helps you float down from the sky."],
  ["snowflake","❄️","A tiny piece of ice that falls in winter."],["scientist","🧑‍🔬","A person who does experiments."],
  ["jellyfish","🪼","A squishy sea animal that can sting."],["spaceship","🛸","Aliens might fly to Earth in one."],
  ["pineapple","🍍","A spiky fruit that is sweet and yellow inside."],["blueberry","🫐","A tiny round fruit that is blue."],
  ["superhero","🦸","Someone with special powers who saves the day."],["motorcycle","🏍️","A bike with an engine that goes vroom."],
  ["headphones","🎧","You wear them over your ears to listen to music."],["ambulance","🚑","It rushes sick people to the hospital."],
];

// Difficulty tiers. `len` is the range of word lengths used; `hiddenClue` means the
// clue stays hidden until the player spends a balloon on it.
const LEVELS = {
  little: { icon: "🐣", name: "Little Kid", list: LITTLE, tiers: [
    { label: "🟢 Easy",   len: [3, 3], balloons: 8 },
    { label: "🟡 Medium", len: [4, 4], balloons: 7 },
    { label: "🔴 Hard",   len: [5, 5], balloons: 6 },
  ]},
  big: { icon: "🚀", name: "Big Kid", list: BIG, tiers: [
    { label: "🟢 Easy",   len: [5, 6],  balloons: 7 },
    { label: "🟡 Medium", len: [7, 8],  balloons: 6 },
    { label: "🔴 Hard",   len: [9, 12], balloons: 5, hiddenClue: true },
  ]},
};
const WINS_TO_LEVEL_UP = 3;   // wins in a row that move the player up a difficulty

function wordsFor(level, d) {
  const [lo, hi] = LEVELS[level].tiers[d].len;
  return LEVELS[level].list.filter(([w]) => w.length >= lo && w.length <= hi);
}

// ---------------- everything the game says out loud ----------------
// Kept in one place so build.py can pre-record every phrase for the static site.
const AN = new Set("aefhilmnorsx");
const article = l => (AN.has(l) ? "an " : "a ") + l.toUpperCase();
const Say = {
  intro: (level, e, hiddenClue) => level === "little"
    ? `Let's spell ${e.word}! Can you find the letters?`
    : hiddenClue
      ? `Your word has ${e.word.length} letters. Tap the light bulb for a clue, but it costs a balloon!`
      : `Your word has ${e.word.length} letters. Here's a clue: ${e.clue}`,
  hear: (level, e) => level === "little" ? e.word : e.clue,
  win: e => `Hooray! You did it! The word is ${e.word}!`,
  lose: e => `Oh no, all the balloons popped! The word was ${e.word}. Let's try another one!`,
  yes: (ch, count) => count > 1 ? `Yes! There are ${count} ${ch.toUpperCase()}'s!` : `Yes! There's ${article(ch)}!`,
  no: ch => `No ${ch.toUpperCase()}. Try again!`,
  levelUp: "Level up! Here come some harder words!",
};

function allPhrases() {
  const out = new Set([Say.levelUp]);
  for (const level of Object.keys(LEVELS)) {
    LEVELS[level].tiers.forEach((tier, d) => {
      for (const [word, emoji, clue] of wordsFor(level, d)) out.add(Say.intro(level, { word, emoji, clue }, !!tier.hiddenClue));
    });
    for (const [word, emoji, clue] of LEVELS[level].list) {
      const e = { word, emoji, clue };
      out.add(Say.hear(level, e)); out.add(Say.win(e)); out.add(Say.lose(e));
      const counts = {};
      for (const c of word) counts[c] = (counts[c] || 0) + 1;
      for (const [c, n] of Object.entries(counts)) if (n > 1) out.add(Say.yes(c, n));
    }
  }
  for (const c of "abcdefghijklmnopqrstuvwxyz") { out.add(Say.yes(c, 1)); out.add(Say.no(c)); }
  return [...out];
}
