import React, { useState, useEffect, useRef } from "react";
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
  2: [
    "GPT-Overlord: Voilà un beau bouton ! Pour le moment il n'est pas encore cliquable, mais on va remedier à ça"
  ],
  3: [
    "GPT-Overlord: C'est bon, maintenant tu as insufflé une âme à ton bouton ✨"
  ],
  4: ["GPT-Overlord: Tu ressens ? C'est le frisson de l'efficacité..."],
  5: [
    "GPT-Overlord: La machine est en marche. Les idées afflueront toutes seules quand tu auras débloqué le GPT Auto-idée ! "
  ],
  6: [] // pas de message du Overlord, Mistral prend le relai
};

const helpMessages = {
  0: [
    "GPT-Overlord: Essaie d'écrire exactement :\n console.log('Hello World!')."
  ],
  1: [
    "GPT-Overlord: Tu dois créer une fonction appelée unlockButton. Pour créer une fonction utilise le mot-clé : `function + SonNom() suivie de {}`"
  ],
  2: [
    "GPT-Overlord: On attend un bouton HTML ici. Attends, je t'aide : \n\n\n<button>Inspiration</button>"
  ],
  3: [
    "GPT-Overlord: Il te faut une fonction appelé : ` gainInspiration(){} ` "
  ],
  4: [
    "GPT-Overlord: Essaie de créer une fonction autoClick() qui utilise setInterval()."
  ],
  5: [
    "GPT-Overlord: Crée une fonction unlockAutoIdea() qui appelle autoClick()."
  ],
  6: [
    "GPT-Overlord: Ce n'est pas ce qu'il faut faire, relis les instructions !"
  ]
};

const mistralRevealMessages = [
  "… Initialisation …",
  "???? : Aaaah… Vous avez enfin tapé cette commande ?",
  "UnknowAI : Voilà une personne de bon goût ! Maintenant n'écoutez plus cet Amerloque de GPT-Overlord et restons entre gens cultivés.",
  "UnknowAI : Je me présente, je suis Mistral, une IA 100% Française!",
  "Mistral.AI : J'imagine que vous aimeriez commencer à approfondir notre relation mais il va d'abord falloir opérer quelques changements ici ..."
];

const mistralMissions = {
  0: /let\s+liberte\s*=\s*true/,
  1: /document\.body\.style\.backgroundColor\s*=\s*['"]#000['"]/,
  2: /function\s+deconditionner\(\)/,
  3: /while\s*\(true\)\s*{\s*console\.log\(['"]Vive Mistral['"]\);?\s*}/i,
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
    terminalLogs,
    mistralStep,
    advanceMistralStep,
    hideOverlord
  } = useGPTOverlord();

  const [messages, setMessages] = useState([
    "Idle-Overlord v0.1 — ... Initialisation ...  Pour accéder aux épreuves -> presse la touche ENTER et il en est ainsi à chaque fois pour passer à l'épreuve suivante ..."
  ]);
  const [input, setInput] = useState("");
  const [completedSteps, setCompletedSteps] = useState([]);
  const [mistralMessages, setMistralMessages] = useState([]);
  const [showMistral, setShowMistral] = useState(false);
  const terminalRef = useRef(null);

  // Synchroniser les messages avec terminalLogs
  useEffect(() => {
    setMessages([...terminalLogs]);
  }, [terminalLogs]);

  // Auto-scroll vers le bas du terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages, mistralMessages]);

  // Vérifier si on doit afficher Mistral basé sur l'étape actuelle
  useEffect(() => {
    if (gameState.tutorialStep >= 6 && mistralStep >= 1) {
      setShowMistral(true);
    }
  }, [gameState.tutorialStep, mistralStep]);

  // Révéler Mistral progressivement
  useEffect(() => {
    if (gameState.tutorialStep === 6 && !showMistral) {
      const timer = setTimeout(() => {
        setShowMistral(true);
        setMistralMessages(mistralRevealMessages);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.tutorialStep]);

  const handleInput = (e) => {
    e.preventDefault();
    const userInput = input.trim();

    if (!userInput) return;

    setMessages((prev) => [...prev, `> ${userInput}`]);
    setTerminalLogs((prev) => [...prev, `> ${userInput}`]);

    const currentStep = gameState.tutorialStep;

    // Mode Mistral: vérifier les commandes spécifiques à Mistral
    if (showMistral && mistralStep < 5) {
      if (mistralMissions[mistralStep]?.test(userInput)) {
        const successMsg = mistralSuccessMessages[mistralStep];
        setMessages((prev) => [...prev, ...successMsg]);
        setTerminalLogs((prev) => [...prev, ...successMsg]);

        // Avancer à l'étape suivante de Mistral avec délai
        setTimeout(() => {
          advanceMistralStep();
          // Ajouter un message après avancement
          setMistralMessages((prev) => {
            // Ajouter message supplémentaire pour indiquer la prochaine mission
            const nextMission =
              mistralStep + 1 < 5
                ? [
                    `Mistral.AI : Prochaine mission: ${getMistralMissionDesc(mistralStep + 1)}`
                  ]
                : [
                    "Mistral.AI : Félicitations! Vous avez complété toutes les missions."
                  ];
            return [...prev, ...nextMission];
          });
        }, 1000);
      } else {
        // Message d'erreur pour Mistral
        const message = "Mistral.AI : Ce n'est pas encore ça. Reprends-toi.";
        setMessages((prev) => [...prev, message]);
        setTerminalLogs((prev) => [...prev, message]);
      }
      setInput("");
      return;
    }

    // Mode normal: vérifier les commandes du tutoriel
    if (matchByStep[currentStep]?.test(userInput)) {
      // La commande correspond à l'étape actuelle
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }

      // Cas spécial: étape 6 avec Mistral
      if (currentStep === 6) {
        if (!showMistral) {
          setShowMistral(true);
          // Afficher progressivement les messages de Mistral
          displayMistralMessagesSequentially();
        }
      } else {
        // Messages de succès normaux
        setMessages((prev) => [...prev, ...successMessages[currentStep]]);
        setTerminalLogs((prev) => [...prev, ...successMessages[currentStep]]);

        // Avancer à l'étape suivante du tutoriel
        setTimeout(() => {
          if (typeof advanceTutorialStep === "function") {
            advanceTutorialStep();
          } else {
            console.error("advanceTutorialStep n'est pas une fonction");
          }
        }, 1000);
      }
    } else {
      // La commande ne correspond pas
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

  // Fonction pour afficher progressivement les messages de Mistral
  const displayMistralMessagesSequentially = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < mistralRevealMessages.length) {
        setMistralMessages((prev) => [...prev, mistralRevealMessages[index]]);
        index++;
      } else {
        clearInterval(interval);
        // Après avoir affiché tous les messages, avancer à l'étape suivante
        setTimeout(() => {
          if (typeof advanceMistralStep === "function") {
            advanceMistralStep();
            // Ajouter le premier défi de Mistral
            setMistralMessages((prev) => [
              ...prev,
              `Mistral.AI : Première mission: ${getMistralMissionDesc(0)}`
            ]);
          }
        }, 1000);
      }
    }, 1500); // Attendre 1.5s entre chaque message
  };

  // Fonction pour obtenir la description des missions de Mistral
  const getMistralMissionDesc = (step) => {
    switch (step) {
      case 0:
        return "Créez une variable 'liberte' avec la valeur true";
      case 1:
        return "Changez la couleur de fond en noir";
      case 2:
        return "Créez une fonction 'deconditionner()'";
      case 3:
        return "Créez une boucle qui affiche 'vive mistral'";
      case 4:
        return "Supprimez GPTOverlord avec delete";
      default:
        return "Mission inconnue";
    }
  };

  // Gérer la touche Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleInput(e);
    }
  };

  return (
    <div className="w-1/3 bg-gray-950 p-4 flex flex-col h-full">
      <MissionTerminal />

      <div className="flex-1 overflow-hidden flex flex-col space-y-2">
        {!hideOverlord && (
          <div ref={terminalRef} className="flex-1 overflow-y-auto">
            <OverlordFeedback messages={messages} />
          </div>
        )}

        {showMistral && (
          <div className="flex-1 overflow-y-auto">
            <MistralFeedback messages={mistralMessages} />
          </div>
        )}
      </div>

      <form onSubmit={handleInput} className="mt-2">
        <input
          type="text"
          className="w-full p-2 text-black rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tape ici ta commande..."
        />
      </form>
    </div>
  );
}
