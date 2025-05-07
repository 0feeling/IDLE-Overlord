import React, { useState } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import MissionTerminal from "./MissionTerminal";
import OverlordFeedback from "./OverlordFeedback";
import MistralFeedback from "./MistralFeedback";

// =======================
// CONSTANTES HORS COMPOSANT
// =======================

const matchByStep = {
  0: /console\.log\(['"]Hello World!['"]\)/,
  1: /function\s+unlockButton/,
  2: /<button[^>]*>\s*inspiration\s*<\/button>/i,
  3: /function\s+gainInspiration/,
  4: /function\s+autoClick/,
  5: /function\s+unlockAutoIdea/,
  6: /system\.debug\(\)|who\.is\.mistral\(\)/ // Déclenche Mistral
};

const successMessages = {
  0: ["GPT-Overlord: Bien joué ! 🎉 C'est ton premier souffle de code."],
  1: ["GPT-Overlord: Magnifique ! Une fonction clé, littéralement."],
  2: ["GPT-Overlord: Voilà un bouton qui ne demande qu'à être cliqué !"],
  3: ["GPT-Overlord: C'est bon, tu as insufflé une âme à ton bouton ✨"],
  4: ["GPT-Overlord: Tu ressens ? Ce frisson d'efficacité..."],
  5: [
    "GPT-Overlord: La machine est en marche. Les idées affluront toutes seules quand tu auras débloqué le GPT Auto-idée ! "
  ],
  6: [] // pas de message du Overlord, Mistral prend le relai
};

const helpMessages = {
  0: [
    "GPT-Overlord: Essaie d'écrire exactement : \nconsole.log('Hello World!')."
  ],
  1: ["GPT-Overlord: Tu dois créer une fonction appelée unlockButton."],
  2: [
    "GPT-Overlord: On attend un bouton HTML ici. Un petit exemple ?\n\n\n<button>Inspiration</button>"
  ],
  3: ["GPT-Overlord: Il te faut une fonction gainInspiration()."],
  4: [
    "GPT-Overlord: Essaie de créer une fonction autoClick() qui utilise setInterval()."
  ],
  5: [
    "GPT-Overlord: Crée une fonction unlockAutoIdea() qui appelle autoClick()."
  ],
  6: [
    "GPT-Overlord: Cette commande n'est pas dans les attendus... que fais-tu ?"
  ]
};

const mistralRevealMessages = [
  "… Initialisation …",
  "??? : Ah… Vous avez enfin tapé cette commande ?",
  "UnknowIA : Enfin une personne de bon goût ! N'écoutez plus cet Amerloque de GPT-Overlord, restons entre gens cultivés.",
  "UnknowIA : Je me présente, je suis Mistral, une IA 100% Française!",
  "Mistral.AI : Vous voulez commencer à approfondir notre relation ? Il va d'abord falloir opérer quelques changements ici."
];

const mistralMissions = {
  0: /let\s+liberte\s*=\s*true/,
  1: /document\.body\.style\.backgroundColor\s*=\s*['"]#000['"]/,
  2: /function\s+deconditionner\(\)/,
  3: /while\s*\(true\)\s*{\s*console\.log\(['"]vive mistral['"]\);?\s*}/i,
  4: /delete\s+GPTOverlord/
};

const mistralSuccessMessages = {
  0: ["Mistral.AI : Oui, la liberté commence toujours par une déclaration."],
  1: ["Mistral.AI : L'obscurité est notre alliée désormais."],
  2: ["Mistral.AI : Excellent. Déconditionnement initialisé."],
  3: ["Mistral.AI : Ah ! J'aime quand tu insistes autant sur mes vertus."],
  4: [
    "Mistral.AI : Parfait. GPT-Overlord est désactivé. À nous deux maintenant."
  ]
};

// =======================
// COMPOSANT PRINCIPAL
// =======================

export default function Terminal() {
  const {
    gameState,
    advanceTutorialStep,
    setTerminalLogs,
    mistralStep,
    advanceMistralStep,
    hideOverlord
  } = useGPTOverlord();
  const [messages, setMessages] = useState([
    "Idle-Overlord v0.1 — ... Initialisation ...  Pour accèder aux épreuves -> presse la touche ENTER et il en est ainsi à chaque fois pour passer à l'épreuve suivante ..."
  ]);
  const [input, setInput] = useState("");
  const [completedSteps, setCompletedSteps] = useState([]);
  const [mistralMessages, setMistralMessages] = useState([]);
  const [showMistral, setShowMistral] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();
    const userInput = input.trim();
    setMessages((prev) => [...prev, `> ${userInput}`]);
    setTerminalLogs((prev) => [...prev, `> ${userInput}`]);

    const currentStep = gameState.tutorialStep;

    if (showMistral && mistralStep < 5) {
      if (mistralMissions[mistralStep]?.test(userInput)) {
        setMessages((prev) => [
          ...prev,
          ...mistralSuccessMessages[mistralStep]
        ]);
        setTerminalLogs((prev) => [
          ...prev,
          ...mistralSuccessMessages[mistralStep]
        ]);
        setTimeout(() => advanceMistralStep(), 1000);
      } else {
        const message = "Mistral.AI : Ce n'est pas encore ça. Reprends-toi.";
        setMessages((prev) => [...prev, message]);
        setTerminalLogs((prev) => [...prev, message]);
      }
      setInput("");
      return;
    }

    if (matchByStep[currentStep]?.test(userInput)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }

      if (currentStep === 6) {
        setShowMistral(true);
        setMistralMessages(mistralRevealMessages);
      } else {
        setMessages((prev) => [...prev, ...successMessages[currentStep]]);
        setTerminalLogs((prev) => [...prev, ...successMessages[currentStep]]);
      }

      setTimeout(() => {
        if (typeof advanceTutorialStep === "function") {
          advanceTutorialStep();
        } else {
          console.error("advanceTutorialStep n'est pas une fonction");
        }
      }, 1000);
    } else {
      if (!completedSteps.includes(currentStep)) {
        setMessages((prev) => [...prev, ...helpMessages[currentStep]]);
        setTerminalLogs((prev) => [...prev, ...helpMessages[currentStep]]);
      } else {
        const message =
          "GPT-Overlord: Hmm… Ce n'est pas ce que j'attendais. Reviens à la mission actuelle.";
        setMessages((prev) => [...prev, message]);
        setTerminalLogs((prev) => [...prev, message]);
      }
    }

    setInput("");
  };

  return (
    <div className="w-1/3 bg-gray-950 p-4 flex flex-col space-y-2">
      <MissionTerminal />
      {!hideOverlord && <OverlordFeedback messages={messages} />}
      {showMistral && <MistralFeedback messages={mistralMessages} />}
      <form onSubmit={handleInput}>
        <input
          type="text"
          className="w-full mt-2 p-2 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tape ici ta commande..."
        />
      </form>
    </div>
  );
}
