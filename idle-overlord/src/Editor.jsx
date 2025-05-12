import React, { useEffect, useState, useRef } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import MissionPanel from "./MissionPanel"; // Import du composant MissionPanel

const DEV_MODE = true;

const matchByStep = {
  0: DEV_MODE
    ? /^m$|console\.log\s*\(\s*(['"])\s*!*hello[\s-]?world!?\s*!*\1\s*\)\s*;?/i
    : /console\.log\s*\(\s*(['"])\s*!*hello[\s-]?world!?\s*!*\1\s*\)\s*;?/i,

  1: DEV_MODE
    ? /^m$|function\s+unlockButton\s*\(\s*\)\s*\{?/i
    : /function\s+unlockButton\s*\(\s*\)\s*\{?/i,

  2: DEV_MODE
    ? /^m$|<button[^>]*>\s*inspiration\s*<\/button>/i
    : /<button[^>]*>\s*inspiration\s*<\/button>/i,

  3: DEV_MODE
    ? /^m$|(?=.*g[ae]i?n)(?=.*spi)(?=.*rat)(?=.*ion)(?=.*click)/is
    : /(?=.*g[ae]i?n)(?=.*spi)(?=.*rat)(?=.*ion)(?=.*click)/is,

  4: DEV_MODE
    ? /^m$|function\s+autoClick\s*\(\s*\)\s*\{\s*setInterval\s*\(\s*gainInspiration\s*,\s*1000\s*\)\s*;?\s*\}?/i
    : /function\s+autoClick\s*\(\s*\)\s*\{\s*setInterval\s*\(\s*gainInspiration\s*,\s*1000\s*\)\s*;?\s*\}?/i,

  5: DEV_MODE
    ? /^m$|function\s+unlockAutoIdea\s*\(\s*\)\s*\{\s*autoClick\s*\(\s*\)\s*;?\s*\}?/i
    : /function\s+unlockAutoIdea\s*\(\s*\)\s*\{\s*autoClick\s*\(\s*\)\s*;?\s*\}?/i,

  6: DEV_MODE
    ? /^m$|\b(who\.is\.cristal\s*\(\s*\)|system\.debug\s*\(.*\))/i
    : /\b(who\.is\.cristal\s*\(\s*\)|system\.debug\s*\(.*\))/i
};

const cristalMissions = {
  0: DEV_MODE
    ? /^m$|(?=.*\blet\b)?(?=.*\b(freedom|libert[ée]|liberty)\b)(?=.*\b(true|vrai[ea]?)\b)/i
    : /(?=.*\blet\b)?(?=.*\b(freedom|libert[ée]|liberty)\b)(?=.*\b(true|vrai[ea]?)\b)/i,

  1: DEV_MODE
    ? /^m$|(?=.*\b(textarea|editor)\b)(?=.*(bleu|blue|#0055A4|#00f|#0000ff))(?=.*(blanc|white|#fff|#ffffff))(?=.*(rouge|red|#EF4135|#f00|#ff0000))/i
    : /(?=.*\b(textarea|editor)\b)(?=.*(bleu|blue|#0055A4|#00f|#0000ff))(?=.*(blanc|white|#fff|#ffffff))(?=.*(rouge|red|#EF4135|#f00|#ff0000))/i,

  2: DEV_MODE
    ? /^m$|function\s*purifierLaPage\s*\(\s*\)\s*\{(?=[\s\S]*?\.replace\s*\(\s*"AutoIdea\s*:\s*(?:locked|unlocked)"\s*,\s*[^)]*\))(?=[\s\S]*?\.replace\s*\(\s*"Current\s*mission"\s*,\s*[^)]*\))(?=[\s\S]*?\.replace\s*\(\s*"Per\s*second"\s*,\s*"Par\s*seconde"\s*\))[\s\S]*?\}/i
    : /function\s*purifierLaPage\s*\(\s*\)\s*\{(?=[\s\S]*?\.replace\s*\(\s*"AutoIdea\s*:\s*(?:locked|unlocked)"\s*,\s*[^)]*\))(?=[\s\S]*?\.replace\s*\(\s*"Current\s*mission"\s*,\s*[^)]*\))(?=[\s\S]*?\.replace\s*\(\s*"Per\s*second"\s*,\s*"Par\s*seconde"\s*\))[\s\S]*?\}/i,

  3: DEV_MODE
    ? /^m$|while\s*\(\s*true\s*\)\s*\{[^}]*console\.log\s*\(\s*(['"])\s*vive\s+cristal\s*\1\s*\)\s*;?[^}]*\}/i
    : /while\s*\(\s*true\s*\)\s*\{[^}]*console\.log\s*\(\s*(['"])\s*vive\s+cristal\s*\1\s*\)\s*;?[^}]*\}/i,

  4: DEV_MODE ? /^m$|delete\s+CatGPT\s*;?/i : /delete\s+CatGPT\s*;?/i
};

const successMessagesCristal = {
  0: "Cristal : Voilà enfin une Déclaration digne de ce nom !",
  1: "Cristal : Cette esthétique est un peu plus supportable. Ce n’est pas trop tôt.",
  2: "Cristal : Cette interface est enfin un peu civilisé. Ne trainez pas, il y a encore du travail",
  3: "Cristal : Enfin des paroles sensées !",
  4: "Cristal : Suppression exécutée. L’air devient un plus respirable sans ce bon à rien !"
};

const successMessagesByStep = {
  "-1": "CatGPT : Excellent ! Now you are ready ! on va pouvoir commencer les true things 💪",
  0: "CatGPT : Perfect ! Tu sais now show un message in the console 📢",
  1: "CatGPT : Une function créée ! Ça y est, tu commences à manipulate le code comme un vrai wizard 🔮",
  2: "CatGPT : Nice ! Tu viens d’ajouter ton premier bouton HTML 🎯",
  3: "CatGPT : Magique ! Ton bouton déclenche maintenant une vraie action ✨",
  4: "CatGPT : Good Job ! Ta machine commence to product automatiquement ⏱️",
  5: "CatGPT : Factory en route ! Tu sais enclencher l’automatisation 🏭",
  6: "CatGPT : Je te laisses meet Cristal ! Je vais chercher de nouvelles tasks for you 👁️"
};

// Solutions exactes à copier-coller pour chaque étape
const helpMessages = {
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

const cristalHelpMessages = {
  0: [
    `Vous commencez très mal ! Appliquez donc les instructions dans la console. `
  ],
  1: [
    `C'est pourtant facile : document.choisir('éditeur').style.arrièrePlan = 'dégradé-linéaire(vers la droite, bleu, blanc, rouge)' Je vous l'ai déjà dis`
  ],
  2: [
    `Vous n'êtes pas le couteau le plus aiguisé du tiroir ! Créez donc une fonction sur ce modèle : function NameOfTheFunction() {
document.corps.interieurHTML = document.corps.interieurHTML
.remplace("EnglishWord1", "MotFrançais1")
.remplace("EnglishWord2", "MotFrançais2")
.remplace("EnglishWord3", "MotFrançais3")
.remplace("EnglishWord4", "MotFrançais4")
}. `
  ],
  3: [`Créez donc au plus vite cette Boucle, c'est plus que nécessaire ! `],
  4: [`N'hésitez pas ! Ecrivez donc: " delete CatGPT " dans votre éditeur`]
};

// Fonction de validation générique
const validateCode = (step, code, patternSet) => {
  const cleanedCode = code.trim();
  return patternSet?.[step]?.test(cleanedCode);
};

// Gestionnaire de succès générique
const handleSuccess = (
  message,
  source,
  advanceFn,
  logToTerminal,
  clearEditor
) => {
  logToTerminal({ text: message, source });
  advanceFn();
  clearEditor();
};

// Gestionnaire d'erreur générique
const handleError = (message, source, logToTerminal) => {
  logToTerminal({ text: message, source });
};

function Editor() {
  const {
    gameState,
    setGameState,
    logToTerminal,
    advanceTutorialStep,
    cristalStep,
    advanceCristalStep
  } = useGPTOverlord();

  // Ajoutez ces 3 lignes manquantes
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("info");
  const editorRef = useRef(null);

  const [code, setCode] = useState(gameState.code || "");

  useEffect(() => {
    if (gameState.code !== code) {
      setCode(gameState.code);
    }

    if (
      (gameState.cristalMode && gameState.cristalMissions?.[2]?.validated) ||
      localStorage.getItem("cristal-flag-applied") === "true"
    ) {
      if (editorRef.current) {
        editorRef.current.style.background =
          "linear-gradient(to right, #0055A4, white, #EF4135)";
        localStorage.setItem("cristal-flag-applied", "true");
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

  // Fonction pour activer Cristal
  const triggerCristalActivation = () => {
    const message = "Commande secrète détectée...";
    logToTerminal({ text: message, source: "gpt" });

    setTimeout(() => {
      advanceTutorialStep();
      setGameState((prev) => ({
        ...prev,
        cristalMode: true,
        cristalStep: 0,
        code: ""
      }));
      clearEditor();
    }, 1000);
  };

  const handleCodeExecution = () => {
    const cleanedCode = code.trim();

    if (gameState.tutorialStep === -1) {
      const readyRegex = /^(y|yes|oui)$/i;
      if (readyRegex.test(cleanedCode)) {
        advanceTutorialStep();
        logToTerminal("CatGPT: Let's gooo ! 🚀");
        clearEditor();
        return;
      } else {
        logToTerminal("CatGPT: Tape juste 'y' pour confirmer ! 😸");
        return;
      }
    }

    const currentStep = gameState.cristalMode ? -1 : gameState.tutorialStep;

    if (
      gameState.tutorialStep >= 6 &&
      (code.includes("system.debug()") || code.includes("who.is.cristal()"))
    ) {
      triggerCristalActivation();
      return;
    }

    if (
      gameState.cristalMode ||
      (gameState.tutorialStep >= 6 && cristalStep >= 0)
    ) {
      const isCristalValid = validateCode(cristalStep, code, cristalMissions);
      if (isCristalValid) {
        setFeedbackType("success");
        handleSuccess(
          successMessagesCristal[cristalStep] ||
            "Cristal : Exécution correcte.",
          "cristal",
          advanceCristalStep,
          logToTerminal,
          clearEditor
        );
      } else {
        setFeedbackType("error");
        handleError(
          `Cristal.AI : ${cristalHelpMessages[cristalStep][0] || "Code incorrect"}`,
          "cristal",
          logToTerminal
        );
      }
      return;
    }

    const isCatGPTValid = validateCode(currentStep, code, matchByStep);
    if (isCatGPTValid) {
      setFeedbackType("success");
      handleSuccess(
        successMessagesByStep[currentStep] || "CatGPT : Mission réussie !",
        "gpt",
        advanceTutorialStep,
        logToTerminal,
        clearEditor
      );
    } else {
      setFeedbackType("error");
      handleError(
        `CatGPT: ${helpMessages[currentStep][1] || "Essayez encore !"}`,
        "gpt",
        logToTerminal
      );
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleCodeExecution();
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [gameState.tutorialStep]);

  return (
    <div className="flex flex-col bg-gray-800 border-r border-gray-700 h-[400px]">
      {/* En-tête */}
      <div className="bg-gray-900 p-2 flex justify-between items-center border-b border-gray-700">
        <span className="text-blue-300 text-sm">Editor.js</span>
        <button
          onClick={handleCodeExecution}
          className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
        >
          Exécuter (Ctrl+Enter)
        </button>
      </div>

      {/* Conteneur principal éditeur + feedback */}
      <div className="flex-1 flex flex-col relative">
        <textarea
          ref={editorRef}
          className="flex-1 bg-white text-black p-4 font-mono resize-none outline-none"
          placeholder="// Écrivez votre code ici"
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          value={code}
        />

        {/* Console de feedback */}
        {feedback && (
          <div
            className={`p-2 text-sm border-t border-gray-700 ${feedbackType === "error" ? "bg-red-900" : "bg-green-900"}`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}

export default Editor;
