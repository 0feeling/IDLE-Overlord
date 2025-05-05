import React, { useEffect, useState } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import MissionTerminal from "./MissionTerminal";
import OverlordFeedback from "./OverlordFeedback";

export default function Terminal() {
  const { gameState, advanceTutorialStep } = useGPTOverlord();
  const [messages, setMessages] = useState([
    "Idle-Overlord v0.1 — ... Initialisation ...  Pour accèder aux épreuves -> presse la touche ENTER et il en est ainsi à chaque fois pour passer à l'épreuve suivante ..."
  ]);
  const [input, setInput] = useState("");

  const [completedSteps, setCompletedSteps] = useState([]);

  const handleInput = (e) => {
    e.preventDefault();

    const userInput = input.trim();
    setMessages((prev) => [...prev, `> ${userInput}`]);

    const matchByStep = {
      0: /console\.log\(['"]Hello World!['"]\)/,
      1: /function\s+unlockButton/,
      2: /<button[^>]*>\s*inspiration\s*<\/button>/i,
      3: /function\s+gainInspiration/,
      4: /function\s+autoClick/,
      5: /function\s+unlockAutoIdea/
    };

    const successMessages = {
      0: ["GPT-Overlord: Bien joué ! 🎉 C’est ton premier souffle de code."],
      1: ["GPT-Overlord: Magnifique ! Une fonction clé, littéralement."],
      2: ["GPT-Overlord: Voilà un bouton qui ne demande qu’à être cliqué !"],
      3: ["GPT-Overlord: C’est bon, tu as insufflé une âme à ton bouton ✨"],
      4: ["GPT-Overlord: Tu ressens ? Ce frisson d’efficacité..."],
      5: [
        "GPT-Overlord: La machine est en marche. Les idées affluront toutes seules quand tu auras débloqueé le GPT Auto-idée ! "
      ]
    };

    const helpMessages = {
      0: [
        "GPT-Overlord: Essaie d’écrire exactement : \n`console.log('Hello World!')`. \n ",
        "C’est ta toute première incantation. Tu peux le faire !"
      ],
      1: [
        "GPT-Overlord: Tu dois créer une fonction appelée `unlockButton`. Elle pourrait ressembler à ça :\n\n\nfunction unlockButton() {\n \n}\n"
      ],
      2: [
        "GPT-Overlord: On attend un bouton HTML ici. Un petit exemple ?\n\n\n<button>Inspiration</button>\n"
      ],
      3: [
        "GPT-Overlord: Il te faut une fonction `gainInspiration()`. Voici une piste :\n\n\nfunction gainInspiration()\n"
      ],
      4: [
        "GPT-Overlord: Essaie de créer une fonction `autoClick` qui utilise `setInterval()`.",
        "Un modèle possible :\n\n\nfunction autoClick()\n"
      ],
      5: [
        "GPT-Overlord: Tu peux créer une fonction `unlockAutoIdea()` qui appelle `autoClick()`.",
        "Par exemple :\n\n\nfunction unlockAutoIdea()"
      ]
    };

    const currentStep = gameState.tutorialStep;

    if (matchByStep[currentStep]?.test(userInput)) {
      // Marquer l'étape comme complétée
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setMessages((prev) => [...prev, ...successMessages[currentStep]]);
      setTimeout(() => advanceTutorialStep(), 1000);
    } else {
      // Si ce n’est pas encore fait, proposer de l’aide
      if (!completedSteps.includes(currentStep)) {
        setMessages((prev) => [...prev, ...helpMessages[currentStep]]);
      } else {
        setMessages((prev) => [
          ...prev,
          "GPT-Overlord: Hmm… Ce n’est pas ce que j’attendais. Reviens à la mission actuelle."
        ]);
      }
    }

    setInput("");
  };

  return (
    <div className="w-1/3 bg-gray-950 p-4 flex flex-col space-y-2">
      <MissionTerminal />
      <OverlordFeedback messages={messages} />
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
