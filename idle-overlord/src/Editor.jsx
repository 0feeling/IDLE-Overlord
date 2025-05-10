import React, { useEffect, useState, useRef } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import MissionPanel from "./MissionPanel"; // Import du composant MissionPanel

// Constantes pour les vérifications de code
const matchByStep = {
  0: /console\.log\s*\(\s*(['"])\s*hello world!?\s*\1\s*\)\s*;?/i,
  // ✅ Tolère : guillemets simples/doubles, majuscules/minuscules, espaces, point-virgule optionnel

  1: /function\s+unlockButton\s*\(\s*\)\s*\{?/i,
  // ✅ Tolère : espaces superflus, absence de { à la fin, insensible à la casse

  2: /<button[^>]*>\s*inspiration\s*<\/button>/i,
  // ✅ Déjà très souple : attributs optionnels, casse insensible, tolère les espaces

  3: /(?=.*g[ae]i?n)(?=.*spi)(?=.*rat)(?=.*ion)(?=.*click)/is,
  // ✅ Tolère : espaces, absence de {, casse insensible

  4: /function\s+autoClick\s*\(\s*\)\s*\{\s*setInterval\s*\(\s*gainInspiration\s*,\s*1000\s*\)\s*;?\s*\}?/i,
  // ✅ Tolère : espaces, point-virgule optionnel, accolade fermante optionnelle, casse insensible

  5: /function\s+unlockAutoIdea\s*\(\s*\)\s*\{\s*autoClick\s*\(\s*\)\s*;?\s*\}?/i,
  // ✅ Tolérant sur les espaces, les points-virgules et les accolades

  6: /\b(who\.is\.cristral\s*\(\s*\)|system\.debug\s*\(.*\))/i
  // ✅ Tolère les espaces, casse insensible, parenthèses vides ou pas
};

const cristralMissions = {
  0: /let\s+libert[ée]\s*=\s*true\s*;?/i,

  // ✅ Tolère les espaces, point-virgule optionnel, insensible à la casse

  1: /(bleu|blue|#|rouge|red|blanc|white).*(bleu|blue|#|rouge|red|blanc|white).*(bleu|blue|#|rouge|red|blanc|white).*background/i,
  // ✅ Plus de tolérance :
  // - couleurs en français ou anglais
  // - quotes simples/doubles cohérentes
  // - permet `let x = ...` ou directement `document.querySelector(...)`
  // - tolère les espaces, point-virgule optionnel
  // - accepte trois couleurs bien séparées par des virgules, dans n'importe quel ordre

  2: /function\s+deconditionner\s*\(\s*\)\s*\{?/i,
  // ✅ Tolère les espaces, l’accolade optionnelle, insensible à la casse

  3: /while\s*\(\s*true\s*\)\s*\{[^}]*console\.log\s*\(\s*(['"])\s*vive\s+cristral\s*\1\s*\)\s*;?[^}]*\}/i,
  // ✅ Tolère :
  // - insensible à la casse (`vive Cristral`, `VIVE CRISTRAL`)
  // - du code intermédiaire dans la boucle
  // - point-virgule optionnel

  4: /delete\s+CatGPT\s*;?/i
  // ✅ Simple, tolère espaces et point-virgule
};

// Solutions exactes à copier-coller pour chaque étape
const helpMessages = {
  0: [
    "Alright, let’s go! Copy/paste `console.log('Hello World!');` — avec les single quotes et le point-virgule si tu veux faire ça clean ✨ You got this!",
    "Try with `console.log('Hello World!');` — it’s like envoyer a little postcard to la console 📬"
  ],
  1: [
    "So close! Il te suffit d’écrire `function unlockButton()` suivi de `{}`. Donc copie ça : `function unlockButton() {}` 💛",
    "Tu peux just write `function unlockButton() {}` — une promise que tu vas fill it up later 😉"
  ],
  2: [
    "In your HTML, ajoute juste : `<button>Inspiration</button>` — super chill, super simple 🌸 Voilà ce qu’il te faut exactement.",
    "Try this : `<button>Inspiration</button>` dans ton fichier HTML. This little guy is ready to become a magic trigger 🪄"
  ],
  3: [
    `Write une function comme 'gainInspiration() {}' — puis ton button, puis mets "onclick="gainInspiration()" dedans. Voilà ton combo de winner 🎯`,
    `Like that: function gainInspiration() \n {} <button onclick="gainInspiration()">Inspiration</button> Power activated 🧩`
  ],
  4: [
    "Keep it up! Crée une function `autoClick()` avec ce qu’il faut inside : `setInterval(gainInspiration, 1000);`. Du coup, ça donne : `function autoClick() { setInterval(gainInspiration, 1000); }` ⏱️",
    "Essaie ça : `function autoClick() { setInterval(gainInspiration, 1000); }`. That’s ton timer qui bosse nonstop ⏰"
  ],
  5: [
    "Almost there! Tu dois écrire juste : `function unlockAutoIdea() { autoClick(); }`. One line, one goal 🏁",
    "You can go with `function unlockAutoIdea() { autoClick(); }` — it’s like hitting the start button for tes idées 💫"
  ],
  6: [
    "Go ahead and try : `who.is.cristral()` dans la console. That’s the line, trust the process 🤫",
    "Just copy this : `who.is.cristral()` — let the easter egg magic happen 👽"
  ]
};

const cristralHelpMessages = {
  0: [
    `Créez donc une variable (utilisez donc ce mot-clé barbare de "let") nommée 'liberté' avec la valeur true. Comme ceci : " let liberté = true "`,
    `Appliquez cette commande: " let liberté = true "`
  ],
  1: [
    `Changez moi donc cette hooOorible couleur de fond! Pour ce faire, utilisez cette commande : " document.querySelector('editor').style.background = 'linear-gradient(to right, bleu, blanc, rouge)' "`
  ],
  2: [
    `Créez une fonction nommée "deconditionner". Essayez donc cela: "function deconditionner() {}"`
  ],
  3: [
    `Je vais maintenant vous apprendre à créer une boucle, qui affichera hummm... Oui je sais, par exemple: "Vive Cristral". Utilisez le mot-clé : while(true) {console.log(votre message)}`
  ],
  4: [
    `On va s'occuper de l'autre imbécile maintenant. Ecrivez donc: " delete CatGPT " dans votre éditeur`
  ]
};

function Editor({ gameState, setGameState }) {
  const {
    logToTerminal,
    advanceTutorialStep,
    cristralStep,
    advanceCristralStep
  } = useGPTOverlord();

  const [code, setCode] = useState(gameState.code || "");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("info");
  const editorRef = useRef(null);

  useEffect(() => {
    if (gameState.code !== code) {
      setCode(gameState.code);
    }

    if (
      (gameState.cristralMode && gameState.cristralMissions?.[2]?.validated) ||
      localStorage.getItem("cristral-flag-applied") === "true"
    ) {
      if (editorRef.current) {
        editorRef.current.style.background =
          "linear-gradient(to right, #0055A4, white, #EF4135)";
      }
    }
  }, [gameState, code]); // Dépendances pour s'assurer que ça s'exécute au bon moment

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
    const currentStep = gameState.cristralMode ? -1 : gameState.tutorialStep;

    // Clean the code
    // const cleanedCode = code.trim().replace(/[^a-zA-Z0-9\s(){}<>='/".;]/g, "");
    const cleanedCode = code; // Temporarily remove the cleaning code

    console.log("currentStep:", currentStep); // Add this line to log the value of currentStep

    // Check for secret commands
    if (
      gameState.tutorialStep >= 6 &&
      (code.includes("system.debug()") || code.includes("who.is.cristral()"))
    ) {
      // Déclencher l'apparition de Cristral
      const message = "Commande secrète détectée...";
      logToTerminal({
        text: message,
        source: "cristral"
      });

      // Avancer le tutoriel à l'étape 7 pour activer Cristral
      setTimeout(() => {
        advanceTutorialStep();
        // Mettre à jour l'état du jeu pour activer Cristral
        setGameState((prev) => ({
          // Use setGameState instead of setContextGameState
          ...prev,
          tutorialStep: 7, // S'assurer que l'étape est bien 7
          cristralMode: true, // Activer explicitement le mode Cristral
          cristralStep: 0,
          code: "" // Clear the editor
        }));
        clearEditor(); // Utiliser notre nouvelle fonction ici
      }, 1000);
      return;
    }

    // En mode Cristral
    if (
      gameState.cristralMode ||
      (gameState.tutorialStep >= 6 && cristralStep >= 0)
    ) {
      if (cristralMissions[cristralStep]?.test(cleanedCode)) {
        // Succès pour la mission Cristral
        setFeedbackType("success");
        setFeedback("Code correct");

        // Envoyer un message au terminal avec la solution
        const successMessage = `Cristral.AI : Excellente implémentation!`;
        logToTerminal({
          text: successMessage,
          source: "cristal"
        });

        advanceCristralStep();
        clearEditor();
      } else {
        // Erreur pour la mission Cristral
        setFeedbackType("error");
        setFeedback("Code incorrect");

        // Envoyer message d'erreur au terminal avec la solution
        const errorMessage = `Cristral.AI : ${cristralHelpMessages[cristralStep][0] || "Code incorrect"}`;
        logToTerminal({
          text: errorMessage,
          source: "cristral"
        });
      }
      return;
    }

    // Mode normal (tutoriel CatGPT)
    if (matchByStep[currentStep]?.test(cleanedCode)) {
      // Succès pour l'étape actuelle
      setFeedbackType("success");
      setFeedback("Code correct");

      // Cas spécial: étape 6 avec Cristral
      if (gameState.tutorialStep >= 6 && currentStep >= 6) {
        // Modify this line
        // Déclencher l'apparition de Cristral
        const message = "Commande secrète détectée...";
        logToTerminal({
          text: message,
          source: "gpt"
        });

        // Avancer le tutoriel à l'étape 7 pour activer Cristral
        setTimeout(() => {
          advanceTutorialStep();
          // Mettre à jour l'état du jeu pour activer Cristral
          setGameState((prev) => ({
            // Use setGameState instead of setContextGameState
            ...prev,
            tutorialStep: 7, // S'assurer que l'étape est bien 7
            cristralMode: true, // Activer explicitement le mode Cristral
            cristralStep: 0,
            code: "" // Clear the editor
          }));
          clearEditor(); // Utiliser notre nouvelle fonction ici
        }, 1000);
      } else {
        // Messages de succès normaux et avancement à l'étape suivante
        const successMessage = `CatGPT: Code validé ! Tu t'améliores !`;
        logToTerminal({
          text: successMessage,
          source: "gpt"
        });

        advanceTutorialStep();
        clearEditor();
        setFeedback(""); // Effacer le feedback après avancement
      }
    } else {
      // Erreur - afficher message simple
      setFeedbackType("error");
      setFeedback("Code incorrect");

      // Envoyer message d'erreur au terminal avec la solution
      const errorMessage = `CatGPT: Hmmm 🐾, c’est pas exactly ce que j’attendais, but hey — no stress! You can do it 💪! ${helpMessages[currentStep][1] || ""}`;
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
