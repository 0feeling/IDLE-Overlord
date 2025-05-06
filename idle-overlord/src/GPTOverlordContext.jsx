import React, { createContext, useState, useContext, useEffect } from "react";
import generatorsData from "./GeneratorsData"; // Import des données des générateurs

// Conversion des données du générateur au format attendu
const formattedGenerators = {};
generatorsData.forEach((gen) => {
  formattedGenerators[gen.id] = {
    name: gen.name,
    baseCost: gen.baseCost,
    rate: gen.baseInspirationPerSecond,
    count: gen.quantity || 0,
    unlocked: gen.unlocked || false
  };
});

// Missions du tutoriel
const tutorialMissions = [
  {
    instruction:
      "Utiliser console.log('Hello World!') pour émettre une première sortie.",
    validated: false
  },
  { instruction: "Créer une fonction nommée unlockButton.", validated: false },
  {
    instruction: "Ajouter un élément cliquable de type <button>.",
    validated: false
  },
  {
    instruction:
      "Définir une fonction nommée gainInspiration() et l'associer à l'action du bouton.",
    validated: false
  },
  {
    instruction:
      "Créer une fonction automatique de clic. Nom suggéré : autoClick().",
    validated: false
  },
  {
    instruction:
      "Créer la fonction unlockAutoIdea() pour activer le mécanisme de clic automatique.",
    validated: false
  },
  {
    instruction: "Explorer les fonctionnalités avancées du terminal.",
    validated: false
  }
];

const GPTOverlordContext = createContext();
export const useGPTOverlord = () => useContext(GPTOverlordContext);

export const GPTOverlordContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    inspiration: 0,
    autoIdeaUnlocked: false,
    tutorialStep: 0,
    code: "",
    generators: formattedGenerators,
    missions: tutorialMissions
  });

  const [terminalLogs, setTerminalLogs] = useState([
    "Idle-Overlord v0.1 — ... Initialisation ...  Pour accèder aux épreuves -> presse la touche ENTER et il en est ainsi à chaque fois pour passer à l'épreuve suivante ..."
  ]);

  const [mistralStep, setMistralStep] = useState(0);
  const hideOverlord = mistralStep >= 1;

  const advanceMistralStep = () => {
    setMistralStep((prev) => prev + 1);
  };

  // Fonction pour avancer dans le tutoriel
  const advanceTutorialStep = () => {
    setGameState((prev) => {
      const updatedMissions = [...prev.missions];
      if (updatedMissions[prev.tutorialStep]) {
        updatedMissions[prev.tutorialStep].validated = true;
      }

      return {
        ...prev,
        tutorialStep: prev.tutorialStep + 1,
        missions: updatedMissions
      };
    });
  };

  // Fonction pour déverrouiller l'auto-idée
  const unlockAutoIdea = () => {
    setGameState((prev) => ({
      ...prev,
      autoIdeaUnlocked: true
    }));
  };

  // Fonction pour ajouter des logs au terminal
  const logToTerminal = (message) => {
    setTerminalLogs((prev) => [...prev, message]);
  };

  // Sauvegarde et chargement du jeu
  useEffect(() => {
    // Désactiver pour les tests
    // localStorage.clear();

    const savedGame = localStorage.getItem("gpt-overlord-game");
    const savedLogs = localStorage.getItem("gpt-overlord-logs");

    if (savedGame) {
      try {
        const parsed = JSON.parse(savedGame);
        setGameState((prev) => ({
          ...prev,
          ...parsed
        }));
      } catch (err) {
        console.error("Erreur de chargement:", err);
      }
    }

    if (savedLogs) {
      try {
        setTerminalLogs(JSON.parse(savedLogs));
      } catch (err) {
        console.error("Erreur de chargement des logs:", err);
      }
    }
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem("gpt-overlord-game", JSON.stringify(gameState));
    localStorage.setItem("gpt-overlord-logs", JSON.stringify(terminalLogs));
  }, [gameState, terminalLogs]);

  return (
    <GPTOverlordContext.Provider
      value={{
        gameState,
        setGameState,
        terminalLogs,
        setTerminalLogs,
        advanceTutorialStep,
        unlockAutoIdea,
        logToTerminal,
        mistralStep,
        advanceMistralStep,
        hideOverlord
      }}
    >
      {children}
    </GPTOverlordContext.Provider>
  );
};
