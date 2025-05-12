export const tutorialRegex = {
  0: /^m$|console\.log\s*\(\s*(['"])[\s!]*hello[\s-]?world!?[\s!]*\1\s*\)\s*;?/i,

  1: /^m$|(?=.*\b(textarea|editor)\b)(?=.*\b(bleu|blue|#0055A4|#00f|#0000ff)\b)(?=.*\b(blanc|white|#fff|#ffffff)\b)(?=.*\b(rouge|red|#EF4135|#f00|#ff0000)\b)(?=.*gradient)/i,

  2: /^m$|<button[^>]*>\s*inspiration\s*<\/button>/i,

  3: /^m$|(?=.*g[ae]i?n)(?=.*spi)(?=.*rat)(?=.*ion)(?=.*click)/is,

  4: /^m$|function\s+autoClick\s*\(\s*\)\s*\{\s*setInterval\s*\(\s*gainInspiration\s*,\s*1000\s*\)\s*;?\s*\}?/i,

  5: /^m$|function\s+unlockAutoIdea\s*\(\s*\)\s*\{\s*autoClick\s*\(\s*\)\s*;?\s*\}?/i,

  6: /^m$|\b(who\.is\.cristal\s*\(\s*\)|system\.debug\s*\(.*\))/i
};

export const tutorialHelpMessages = {
  0: [
    "Alright, let’s go! Copy/Colle `console.log('Hello World!');` — avec les single quotes et le point-virgule si tu veux faire ça clean ✨ You got this!",
    "Try with :\n `console.log('Hello World!');` — it’s like envoyer a little postcard to la console 📬"
  ],
  1: [
    "So close! Il te suffit d’écrire `function unlockButton()` suivi de `{}`. Donc copie ça : `function unlockButton() {}` 💛",
    "Tu peux just write :\n `function unlockButton() {}` — une promise que tu vas fill it up later 😉"
  ],
  2: [
    "In your HTML, ajoute juste : `<button>Inspiration</button>` — super chill, super simple 🌸 Voilà ce qu’il te faut exactement.",
    "Try this :\n `<button>Inspiration</button>` dans ton fichier HTML. This little guy is ready to become a magic trigger 🪄"
  ],
  3: [
    `Write une function comme 'gainInspiration() {}' — puis ton button, puis mets "onclick="gainInspiration()" dedans. Voilà ton combo de winner 🎯`,
    `Like that:\n function gainInspiration() \n {} <button onclick="gainInspiration()">Inspiration</button> Power activated 🧩`
  ],
  4: [
    "Keep it up! Crée une function `autoClick()` avec ce qu’il faut inside : `setInterval(gainInspiration, 1000);`. Du coup, ça donne : `function autoClick() { setInterval(gainInspiration, 1000); }` ⏱️",
    "Essaie ça :\n `function autoClick() { setInterval(gainInspiration, 1000); }`. That’s ton timer qui bosse nonstop ⏰"
  ],
  5: [
    "Almost there! Tu dois écrire juste : `function unlockAutoIdea(){} avec inside les crochets la function autoClick();`. One line, one goal 🏁",
    "You can go with :\n `function unlockAutoIdea() { autoClick(); }` — it’s like hitting the start button for tes idées 💫"
  ],
  6: [
    "Go ahead and try : `who.is.cristal()` dans la console. That’s the line, trust the process 🤫",
    "Just copy this :\n `who.is.cristal()` — let the magic happen 👽"
  ]
};
