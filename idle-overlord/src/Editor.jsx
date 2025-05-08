import React, { useEffect, useState, useRef } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

// Constantes pour les vérifications de code
const matchByStep = {
  0: /console\.log\(['"]Hello World!['"]\)/,
  1: /function\s+unlockButton/,
  2: /<button[^>]*>\s*inspiration\s*<\/button>/i,
  3: /function\s+gainInspiration/,
  4: /function\s+autoClick/,
  5: /function\s+unlockAutoIdea/,
  6: /system\.debug\(\)|who\.is\.mistral\(\)/ // Déclenche Mistral
};

const mistralMissions = {
  0: /let\s+liberte\s*=\s*true/,
  1: /document\.body\.style\.backgroundColor\s*=\s*['"]#000['"]/,
  2: /function\s+deconditionner\(\)/,
  3: /while\s*\(true\)\s*{\s*console\.log\(['"]Vive Mistral['"]\);?\s*}/i,
  4: /delete\s+GPTOverlord/
};

const helpMessages = {
  0: ["Essaie d'écrire exactement : console.log('Hello World!')."],
  1: [
    "Tu dois créer une fonction appelée unlockButton. Pour créer une fonction utilise le mot-clé : `function + SonNom() suivie de {}`"
  ],
  2: [
    "On attend un bouton HTML ici. Attends, je t'aide : \n\n<button>Inspiration</button>"
  ],
  3: ["Il te faut une fonction appelée : `gainInspiration(){}`"],
  4: ["Essaie de créer une fonction autoClick() qui utilise setInterval()."],
  5: ["Crée une fonction unlockAutoIdea() qui appelle autoClick()."],
  6: [
    "Essaie d'utiliser system.debug() ou who.is.mistral() pour découvrir un secret."
  ]
};

const mistralHelpMessages = {
  0: [
    "Tu dois créer une variable nommée 'liberte' avec la valeur true. Exemple: let liberte = true"
  ],
  1: [
    "Change la couleur de fond en noir avec document.body.style.backgroundColor = '#000'"
  ],
  2: [
    "Crée une fonction nommée 'deconditionner'. Exemple: function deconditionner() { ... }"
  ],
  3: [
    "Crée une boucle infinie qui affiche 'vive mistral'. Utilise while(true) { ... }"
  ],
  4: [
    "Supprime GPTOverlord avec l'opérateur delete. Exemple: delete GPTOverlord"
  ]
};

function Editor({ gameState, setGameState }) {
  const {
    logToTerminal,
    advanceTutorialStep,
    mistralStep,
    advanceMistralStep
  } = useGPTOverlord();

  const [code, setCode] = useState(gameState.code || "");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("info"); // "info", "error", "success"
  const editorRef = useRef(null);

  // Synchroniser le code avec le gameState lorsqu'il change
  useEffect(() => {
    if (gameState.code !== code) {
      setCode(gameState.code);
    }
  }, [gameState.code]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);

    // Mettre à jour le gameState avec le nouveau code
    setGameState((prev) => ({
      ...prev,
      code: newCode
    }));
  };

  const handleCodeExecution = () => {
    const currentStep = gameState.mistralMode ? -1 : gameState.tutorialStep;

    // En mode Mistral
    if (
      gameState.mistralMode ||
      (gameState.tutorialStep >= 6 && mistralStep >= 0)
    ) {
      if (mistralMissions[mistralStep]?.test(code)) {
        // Succès pour la mission Mistral
        setFeedbackType("success");
        setFeedback("Mission accomplie! Bravo!");

        // Envoyer un message au terminal
        const successMessage = `Mistral.AI : Excellente implémentation!`;
        logToTerminal(successMessage);

        setTimeout(() => {
          advanceMistralStep();
        }, 1000);
      } else {
        // Erreur pour la mission Mistral
        setFeedbackType("error");
        setFeedback(mistralHelpMessages[mistralStep][0]);

        // Envoyer un message d'erreur au terminal
        const errorMessage = `Mistral.AI : Ce n'est pas encore ça. Reprends-toi.`;
        logToTerminal(errorMessage);
      }
      return;
    }

    // Mode normal (tutoriel GPT-Overlord)
    if (matchByStep[currentStep]?.test(code)) {
      // Succès pour l'étape actuelle
      setFeedbackType("success");
      setFeedback("Bravo! Code correct!");

      // Cas spécial: étape 6 avec Mistral
      if (currentStep === 6) {
        // La gestion de Mistral se fait dans Terminal.jsx
        const message = "Commande secrète détectée...";
        logToTerminal(message);
      } else {
        // Messages de succès normaux et avancement à l'étape suivante
        const successMessage = `GPT-Overlord: Code validé! Passons à l'étape suivante.`;
        logToTerminal(successMessage);

        setTimeout(() => {
          advanceTutorialStep();
          setFeedback(""); // Effacer le feedback après avancement
        }, 1000);
      }
    } else {
      // Erreur - afficher message d'aide
      setFeedbackType("error");
      setFeedback(helpMessages[currentStep][0]);

      // Envoyer message d'erreur au terminal
      const errorMessage = `GPT-Overlord: Ce n'est pas ce que j'attendais. Essaie encore.`;
      logToTerminal(errorMessage);
    }
  };

  const handleKeyDown = (e) => {
    // Exécuter avec Ctrl+Enter ou Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleCodeExecution();
    }

    // Gérer l'indentation avec Tab
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      // Insérer deux espaces à la position du curseur
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);

      // Replacer le curseur après l'indentation
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Rendre le focus à l'éditeur pour une meilleure UX
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [gameState.tutorialStep]);

  return (
    <div className="w-1/3 h-full flex flex-col bg-gray-800 border-r border-gray-700">
      <div className="bg-gray-900 p-2 text-sm flex justify-between items-center">
        <span className="text-blue-300">editor.js</span>
        <button
          onClick={handleCodeExecution}
          className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
        >
          Exécuter (Ctrl+Enter)
        </button>
      </div>

      <textarea
        ref={editorRef}
        className="w-full h-64 bg-white text-black p-4 font-mono text-sm resize-none outline-none border-b border-gray-700"
        value={code}
        onChange={handleCodeChange}
        onKeyDown={handleKeyDown}
        spellCheck="false"
      />

      {feedback && (
        <div
          className={`p-3 text-sm font-mono overflow-auto max-h-40 ${
            feedbackType === "error"
              ? "bg-red-900 text-red-200"
              : feedbackType === "success"
                ? "bg-green-900 text-green-200"
                : "bg-gray-900 text-blue-200"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
}

export default Editor;
