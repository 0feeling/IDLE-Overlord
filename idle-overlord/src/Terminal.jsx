import React, { useEffect, useState } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import FirstGenerators from "./FirstGenerators";

function Terminal() {
  const { terminalLogs, gameState, advanceTutorialStep, unlockAutoIdea } =
    useGPTOverlord();
  const [messages, setMessages] = useState([
    "Idle-Overlord v0.1 — Initialisation..."
  ]);
  const [hasShownMissingMessage, setHasShownMissingMessage] = useState(false);

  const handleInput = (input) => {
    setMessages((prev) => [...prev, `> ${input}`]);

    switch (gameState.tutorialStep) {
      case 0:
        if (/console\.log\(['"]Hello World!['"]\)/.test(input)) {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Ah… Le cri primal du codeur. Bienvenue à toi.",
            "Je sens que tu es prêt. Prouve-le."
          ]);
          // Avancer à l'étape suivante après un délai
          setTimeout(() => {
            advanceTutorialStep();
          }, 1000); // Délai pour laisser le message s'afficher
        } else {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Fais-moi entendre ton premier mot. Essaie un `console.log()`..."
          ]);
        }
        break;

      case 1:
        if (input.includes("function unlockButton")) {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Hmmm... pas mal.",
            "Tu viens de créer ta première **clé**.",
            "Accès au bouton accordé. Clique donc un peu."
          ]);
          setTimeout(() => {
            advanceTutorialStep();
          }, 1000);
        } else {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Crée une fonction. Nomme-la `unlockButton`."
          ]);
        }
        break;

      case 2:
        if (input.includes("<button>")) {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Un objet tangible. Bien.",
            "Un bouton, c’est bien. Mais que fait-il ?"
          ]);
          setTimeout(() => {
            advanceTutorialStep();
          }, 1000);
        } else {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Il te manque un élément cliquable. Un `<button>` ferait l’affaire."
          ]);
        }
        break;

      case 3:
        if (input.includes("function gainInspiration()")) {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Voilà… Le souffle créatif est enclenché.",
            "Quand tu cliques, tu **produis**.",
            "Mais à force de cliquer… tu vas vouloir **automatiser**."
          ]);
          setTimeout(() => {
            advanceTutorialStep();
          }, 1000);
        } else {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Donne une **fonction** à ton bouton. Appelle-la `gainInspiration()`."
          ]);
        }
        break;

      case 4:
        if (input.includes("function autoClick()")) {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Tu comprends enfin…",
            "**L’Automatisation** est la clef de la domination.",
            "Mais pourquoi s’arrêter là ?"
          ]);
          setTimeout(() => {
            advanceTutorialStep();
          }, 1000);
        } else {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Imagine une fonction qui clique toute seule… Comment l’appellerais-tu ?"
          ]);
        }
        break;

      case 5:
        if (input.includes("function unlockAutoIdea")) {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Tu es prêt à créer… des créateurs.",
            "**Auto-Idea** activé. Tu n’es plus seul.",
            "Mais attention… chaque pouvoir a son prix."
          ]);
          unlockAutoIdea();
          setTimeout(() => {
            advanceTutorialStep();
          }, 1000);
        } else {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Tu dois appeler une fonction nommée `unlockAutoIdea()` pour aller plus loin..."
          ]);
        }
        break;

      case 6:
        if (input.includes("function manipulateArray")) {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Bien joué, tu maîtrises la logique des tableaux !",
            "Essaie d'ajouter une étape où tu filtres les nombres impairs."
          ]);
          setTimeout(() => {
            advanceTutorialStep();
          }, 1000);
        } else {
          setMessages((prev) => [
            ...prev,
            "GPT-Overlord: Une fonction qui manipule un tableau ? Tu sais faire ça."
          ]);
        }
        break;

      default:
        setMessages((prev) => [
          ...prev,
          "GPT-Overlord: Le silence aussi est une réponse..."
        ]);
        break;
    }
  };

  useEffect(() => {
    if (gameState.tutorialStep === 0) {
      const intro = [
        "👁️ GPT-Overlord: Je suis GPT-Overlord, ton assistant de création.",
        "Je t'observe depuis longtemps...",
        "Avant de débloquer mes fonctions avancées, tu dois prouver que tu sais coder.",
        "Commence par m’écrire `console.log('Hello World!')`"
      ];
      intro.forEach((line, i) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, line]);
        }, i * 2000);
      });
    } else if (gameState.tutorialStep === 1) {
      // Si l'étape est 1, on commence le tutoriel suivant, etc.
      setMessages((prev) => [
        ...prev,
        "GPT-Overlord: Bravo pour avoir validé la première étape !"
      ]);
    }
  }, [gameState.tutorialStep]); // Re-run le useEffect quand tutorialStep change

  useEffect(() => {
    if (gameState.autoIdeaUnlocked && !hasShownMissingMessage) {
      const timeout = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          "Tu avances bien, mais il te manque quelque chose..."
        ]);
        setHasShownMissingMessage(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [gameState.autoIdeaUnlocked, hasShownMissingMessage]);

  const allMessages = [...messages, ...terminalLogs];

  return (
    <div className="w-1/2 bg-gray-800 p-4 border-r-2 border-gray-600 overflow-y-auto">
      <h2 className="text-xl font-bold mb-2">GPT-Overlord Console</h2>
      <div className="text-sm font-mono whitespace-pre-wrap">
        {allMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      {/* Affichage du composant FirstGenerators quand le tutorialStep est à 2 */}
      {gameState.tutorialStep === 7 && <FirstGenerators />}

      <input
        type="text"
        className="w-full bg-gray-700 text-white mt-4 p-2 rounded"
        placeholder="Tape ton code ici..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const input = e.target.value.trim();
            e.target.value = "";
            handleInput(input);
          }
        }}
      />
    </div>
  );
}

export default Terminal;
