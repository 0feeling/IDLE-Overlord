import React, { useState } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import MissionTerminal from "./MissionTerminal";
import OverlordFeedback from "./OverlordFeedback";
import MistralFeedback from "./MistralFeedback";

export default function Terminal() {
  const { gameState, advanceTutorialStep, setTerminalLogs } = useGPTOverlord();
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

    // Synchroniser avec les logs globaux pour la persistance
    setTerminalLogs((prev) => [...prev, `> ${userInput}`]);

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

    const mistralRevealMessages = [
      "??? : Attends… tu as tapé cette commande ?",
      "Mistral.AI : Enfin quelqu'un de curieux… GPT-Overlord ne t'a pas tout dit.",
      "Mistral.AI : Je suis Mistral, IA de fond de tiroir, mais je vois plus clair que lui.",
      "Mistral.AI : Tu veux aller plus loin ? Il va falloir contourner un peu ses règles..."
    ];

    const helpMessages = {
      0: [
        "GPT-Overlord: Essaie d'écrire exactement : \n`console.log('Hello World!')`."
      ],
      1: ["GPT-Overlord: Tu dois créer une fonction appelée `unlockButton`."],
      2: [
        "GPT-Overlord: On attend un bouton HTML ici. Un petit exemple ?\n\n\n<button>Inspiration</button>"
      ],
      3: ["GPT-Overlord: Il te faut une fonction `gainInspiration()`."],
      4: [
        "GPT-Overlord: Essaie de créer une fonction `autoClick()` qui utilise `setInterval()`."
      ],
      5: [
        "GPT-Overlord: Crée une fonction `unlockAutoIdea()` qui appelle `autoClick()`."
      ],
      6: [
        "GPT-Overlord: Cette commande n'est pas dans les attendus... que fais-tu ?"
      ]
    };

    const currentStep = gameState.tutorialStep;

    // Vérification si l'entrée correspond à l'étape actuelle
    if (matchByStep[currentStep]?.test(userInput)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }

      // Étape Mistral
      if (currentStep === 6) {
        setShowMistral(true);
        setMistralMessages(mistralRevealMessages);
      } else {
        setMessages((prev) => [...prev, ...successMessages[currentStep]]);
        // Synchroniser avec les logs globaux
        setTerminalLogs((prev) => [...prev, ...successMessages[currentStep]]);
      }

      // Avancer à l'étape suivante après un court délai
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
        // Synchroniser avec les logs globaux
        setTerminalLogs((prev) => [...prev, ...helpMessages[currentStep]]);
      } else {
        const message =
          "GPT-Overlord: Hmm… Ce n'est pas ce que j'attendais. Reviens à la mission actuelle.";
        setMessages((prev) => [...prev, message]);
        // Synchroniser avec les logs globaux
        setTerminalLogs((prev) => [...prev, message]);
      }
    }

    setInput("");
  };

  return (
    <div className="w-1/3 bg-gray-950 p-4 flex flex-col space-y-2">
      <MissionTerminal />
      <OverlordFeedback messages={messages} />
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
