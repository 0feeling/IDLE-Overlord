import React, { useEffect, useState, useRef } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import MissionPanel from "./MissionPanel"; // Import du composant MissionPanel

// Constantes pour les vérifications de code
const matchByStep = {
  0: /console\.log\s*\(\s*['"]Hello World!["']\s*\)/,
  1: /function\s+unlockButton/,
  2: /<button[^>]*>\s*inspiration\s*<\/button>/i,
  3: /function\s+gainInspiration/,
  4: /function\s+autoClick/,
  5: /function\s+unlockAutoIdea/,
  6: /(system\.debug\(.*\)|who\.is\.mistral\(.*\))/
  // Déclenche Mistral
};

const mistralMissions = {
  0: /let\s+liberte\s*=\s*true/,
  1: /document\.querySelector\(['"]textarea['"]\)\.style\.background\s*=\s*['"]linear-gradient\(to right,\s*#0055A4,\s*white,\s*#EF4135\)['"]/,
  2: /function\s+deconditionner\(\)/,
  3: /while\s*\(true\)\s*{\s*console\.log\(['"]Vive Mistral['"]\);?\s*}/i,
  4: /delete\s+GPTOverlord/
};

// Solutions exactes à copier-coller pour chaque étape
const helpMessages = {
  0: [
    "Allez, je t’aide ! Tu dois écrire `console.log('Hello World!')` — avec les guillemets simples et le point-virgule à la fin si tu veux faire propre. Tu vas y arriver 🌈",
    "Essaie d’écrire `console.log('Hello World!')` tout simplement. C’est comme envoyer une carte postale à la console 📬"
  ],
  1: [
    "Presque ! Pour créer une fonction, tu écris `function unlockButton()` suivi de `{}`. Tu n’as pas besoin de mettre quoi que ce soit dedans pour le moment 💛",
    "Tu peux écrire quelque chose comme `function unlockButton() {}` — c’est une promesse que tu feras quelque chose avec plus tard 😉"
  ],
  2: [
    "Tu peux ajouter dans ton HTML : `<button>Inspiration</button>` — tout doux, tout simple ! Le bouton n’a pas besoin de faire quoi que ce soit pour l’instant 🌸",
    "Essaie d’écrire `<button>Inspiration</button>` dans ton fichier HTML. Ce petit bouton deviendra un déclencheur magique bientôt ! 🪄"
  ],
  3: [
    'Essaie de faire une fonction avec `function gainInspiration()` suivie de `{}`. Et ensuite, ajoute à ton bouton un `onclick="gainInspiration()"` ! Tu verras, ça cliquera tout seul 🎯',
    'Tu peux écrire une fonction `function gainInspiration() {}` et ajouter `onclick="gainInspiration()"` dans ton `<button>`. C’est comme donner une action à ton bouton ! 🧩'
  ],
  4: [
    "Tu vas y arriver ! Il faut écrire une fonction `autoClick()` et à l’intérieur mettre `setInterval(gainInspiration, 1000);` — c’est lui qui cliquera tout seul pour toi ⏱️",
    "Essaie une fonction comme `function autoClick() { setInterval(gainInspiration, 1000); }`. C’est comme un réveil qui sonne toutes les secondes ⏰"
  ],
  5: [
    "Courage ! Crée une fonction `unlockAutoIdea()` qui appelle juste `autoClick()` à l’intérieur. Une ligne suffit ! C’est le bouton ‘GO’ de ta machine à idées 🏁",
    "Tu peux écrire `function unlockAutoIdea() { autoClick(); }` — c’est une fonction qui appuie sur le bouton ‘clic automatique’ pour toi 💫"
  ],
  6: [
    "Essaie d’écrire `who.is.mistral()` dans la console... chuuuut, c’est un petit secret entre nous 🤫",
    "Tu peux taper `who.is.mistral()` — tu risques d’apprendre un truc étonnant 👽"
  ]
};

const mistralHelpMessages = {
  0: [
    "Créez une variable (utilisez donc ce mot-clé barbare 'let') nommée 'liberte' avec la valeur true. Comme ceci : let liberte = true",
    "Code correct pour cette mission: let liberte = true"
  ],
  1: [
    "Changez donc cet hooOorible couleur de fond! Utilisez cette commande : document.querySelector('textarea').style.background = 'linear-gradient(to right, #0055A4, white, #EF4135)'"
  ],
  2: [
    "Créez une fonction nommée 'deconditionner'. Essayez donc: function deconditionner() {}"
  ],
  3: [
    "Je vais vous apprendre à créer une boucle, qui affichera hummm... Oui je sais, par exemple: 'Vive Cristral'. Utilisez le mot-clé : while(true) {console.log(votre message)}"
  ],
  4: [
    "On va s'occuper de l'autre imbécile maintenant. Ecrivez donc: delete CatGPT dans votre éditeur"
  ]
};

function Editor({ gameState, setGameState }) {
  const {
    logToTerminal,
    advanceTutorialStep,
    mistralStep,
    advanceMistralStep,
    setGameState: setContextGameState
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

  // Fonction pour effacer l'éditeur
  const clearEditor = () => {
    setCode("");
    setGameState((prev) => ({
      ...prev,
      code: ""
    }));

    // Optionnel : effacer aussi le feedback
    setFeedback("");

    // Optionnel : replacer le focus sur l'éditeur
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleCodeExecution = () => {
    const currentStep = gameState.mistralMode ? -1 : gameState.tutorialStep;

    // Clean the code
    // const cleanedCode = code.trim().replace(/[^a-zA-Z0-9\s(){}<>='/".;]/g, "");
    const cleanedCode = code; // Temporarily remove the cleaning code

    console.log("currentStep:", currentStep); // Add this line to log the value of currentStep

    // Check for secret commands
    if (
      gameState.tutorialStep >= 6 &&
      (code.includes("system.debug()") || code.includes("who.is.mistral()"))
    ) {
      // Déclencher l'apparition de Mistral
      const message = "Commande secrète détectée...";
      logToTerminal({
        text: message,
        source: "gpt"
      });

      // Avancer le tutoriel à l'étape 7 pour activer Mistral
      setTimeout(() => {
        advanceTutorialStep();
        // Mettre à jour l'état du jeu pour activer Mistral
        setGameState((prev) => ({
          // Use setGameState instead of setContextGameState
          ...prev,
          tutorialStep: 7, // S'assurer que l'étape est bien 7
          mistralMode: true, // Activer explicitement le mode Mistral
          mistralStep: 1,
          code: "" // Clear the editor
        }));
        clearEditor(); // Utiliser notre nouvelle fonction ici
      }, 1000);
      return;
    }

    // En mode Mistral
    if (
      gameState.mistralMode ||
      (gameState.tutorialStep >= 6 && mistralStep >= 0)
    ) {
      if (mistralMissions[mistralStep]?.test(cleanedCode)) {
        // Succès pour la mission Mistral
        setFeedbackType("success");
        setFeedback("Code correct");

        // Envoyer un message au terminal avec la solution
        const successMessage = `Mistral.AI : Excellente implémentation!`;
        logToTerminal({
          text: successMessage,
          source: "mistral"
        });

        advanceMistralStep();
        clearEditor(); // Utiliser notre nouvelle fonction ici
      } else {
        // Erreur pour la mission Mistral
        setFeedbackType("error");
        setFeedback("Code incorrect");

        // Envoyer message d'erreur au terminal avec la solution
        const errorMessage = `Mistral.AI : Ce n'est pas encore ça. Reprends-toi. ${mistralHelpMessages[mistralStep][1] || ""}`;
        logToTerminal({
          text: errorMessage,
          source: "mistral"
        });
      }
      return;
    }

    // Mode normal (tutoriel GPT-Overlord)
    if (matchByStep[currentStep]?.test(cleanedCode)) {
      // Succès pour l'étape actuelle
      setFeedbackType("success");
      setFeedback("Code correct");

      // Cas spécial: étape 6 avec Mistral
      if (gameState.tutorialStep >= 6 && currentStep >= 6) {
        // Modify this line
        // Déclencher l'apparition de Mistral
        const message = "Commande secrète détectée...";
        logToTerminal({
          text: message,
          source: "gpt"
        });

        // Avancer le tutoriel à l'étape 7 pour activer Mistral
        setTimeout(() => {
          advanceTutorialStep();
          // Mettre à jour l'état du jeu pour activer Mistral
          setGameState((prev) => ({
            // Use setGameState instead of setContextGameState
            ...prev,
            tutorialStep: 7, // S'assurer que l'étape est bien 7
            mistralMode: true, // Activer explicitement le mode Mistral
            mistralStep: 1,
            code: "" // Clear the editor
          }));
          clearEditor(); // Utiliser notre nouvelle fonction ici
        }, 1000);
      } else {
        // Messages de succès normaux et avancement à l'étape suivante
        const successMessage = `GPT-Overlord: Code validé ! Tu t'améliores !`;
        logToTerminal({
          text: successMessage,
          source: "gpt"
        });

        advanceTutorialStep();
        clearEditor(); // Utiliser notre nouvelle fonction ici
        setFeedback(""); // Effacer le feedback après avancement
      }
    } else {
      // Erreur - afficher message simple
      setFeedbackType("error");
      setFeedback("Code incorrect");

      // Envoyer message d'erreur au terminal avec la solution
      const errorMessage = `CatGPT: Hmmm 🐾, ce n’est pas tout à fait ce que j’attendais, mais ne t’inquiète pas ! Tu vas y arriver ! ${helpMessages[currentStep][1] || ""}`;
      logToTerminal({
        text: errorMessage,
        source: "gpt"
      });

      // Reset cursor position
      if (editorRef.current) {
        editorRef.current.selectionStart = 0;
        editorRef.current.selectionEnd = 0;
      }
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
        className="flex-1 bg-white text-black p-4 font-mono text-sm resize-none outline-none border-b border-gray-700"
        placeholder="// Écrivez votre code ici"
        onChange={handleCodeChange}
        onKeyDown={handleKeyDown}
        spellCheck="false"
        value={code}
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

      {/* Intégration du panneau de missions directement dans l'éditeur */}
      <MissionPanel />
    </div>
  );
}

export default Editor;
