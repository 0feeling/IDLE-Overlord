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
    unlocked: true // Tous débloqués par défaut pour simplifier
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
    instruction:
      "Découvrir les commandes secrètes. Essayez system.debug() ou who.is.mistral().",
    validated: false
  }
];

// Missions de Mistral
const mistralMissions = [
  {
    instruction: "Créer une variable 'liberte' avec valeur true",
    validated: false
  },
  { instruction: "Changer la couleur de fond en noir", validated: false },
  { instruction: "Créer une fonction 'deconditionner()'", validated: false },
  {
    instruction: "Créer une boucle infinie qui affiche 'vive mistral'",
    validated: false
  },
  { instruction: "Supprimer GPTOverlord avec delete", validated: false }
];

const GPTOverlordContext = createContext();
export const useGPTOverlord = () => useContext(GPTOverlordContext);

export const GPTOverlordContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    inspiration: 10, // Démarrer avec un peu d'inspiration pour pouvoir acheter
    autoIdeaUnlocked: false,
    tutorialStep: 0,
    code: "// Écrivez votre code ici\n\n",
    generators: formattedGenerators,
    missions: tutorialMissions,
    mistralMissions: mistralMissions,
    inspirationPerSecond: 0, // Nouveau: taux total d'inspiration/seconde
    mistralMode: false // Indique si on est en mode Mistral
  });

  const [terminalLogs, setTerminalLogs] = useState([
    "Idle-Overlord v0.1 — ... Initialisation ...  Pour accéder aux épreuves -> presse la touche ENTER et il en est ainsi à chaque fois pour passer à l'épreuve suivante ..."
  ]);

  const [mistralStep, setMistralStep] = useState(0);
  const [hideOverlord, setHideOverlord] = useState(false);

  // Avancer dans les étapes de Mistral
  const advanceMistralStep = () => {
    setMistralStep((prev) => {
      const newStep = prev + 1;
      // Si on atteint la dernière étape, cacher complètement GPT-Overlord
      if (newStep >= 5) {
        setHideOverlord(true);
        // Augmenter le taux d'inspiration comme récompense
        setGameState((prevState) => ({
          ...prevState,
          inspirationPerSecond: prevState.inspirationPerSecond * 2, // Double le taux d'inspiration
          mistralMode: true
        }));
      }

      // Mettre à jour la validation des missions de Mistral
      setGameState((prevState) => {
        const updatedMistralMissions = [...prevState.mistralMissions];
        if (updatedMistralMissions[prev]) {
          updatedMistralMissions[prev].validated = true;
        }
        return {
          ...prevState,
          mistralMissions: updatedMistralMissions
        };
      });

      return newStep;
    });
  };

  // Fonction pour acheter un générateur
  const buyGenerator = (id) => {
    setGameState((prev) => {
      const gen = prev.generators[id];
      if (!gen) return prev;

      const cost = Math.floor(gen.baseCost * Math.pow(1.15, gen.count));
      if (prev.inspiration < cost) return prev;

      // Mise à jour du taux d'inspiration
      const newCount = gen.count + 1;
      const newRate = prev.inspirationPerSecond + gen.rate;

      return {
        ...prev,
        inspiration: prev.inspiration - cost,
        inspirationPerSecond: newRate,
        generators: {
          ...prev.generators,
          [id]: {
            ...gen,
            count: newCount
          }
        }
      };
    });
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

  // Calculer le taux total d'inspiration à chaque changement de générateurs
  useEffect(() => {
    const calculateTotalRate = () => {
      const totalRate = Object.values(gameState.generators).reduce(
        (acc, gen) => acc + gen.rate * gen.count,
        0
      );

      if (totalRate !== gameState.inspirationPerSecond) {
        setGameState((prev) => ({
          ...prev,
          inspirationPerSecond: totalRate
        }));
      }
    };

    calculateTotalRate();
  }, [gameState.generators]);

  // Production passive d'inspiration
  useEffect(() => {
    if (!gameState.autoIdeaUnlocked && !gameState.mistralMode) return;

    const interval = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        inspiration: prev.inspiration + prev.inspirationPerSecond / 10 // Diviser par 10 car l'intervalle est de 100ms
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.autoIdeaUnlocked, gameState.mistralMode]);

  // Sauvegarde et chargement du jeu
  useEffect(() => {
    const savedGame = localStorage.getItem("gpt-overlord-game");
    const savedLogs = localStorage.getItem("gpt-overlord-logs");
    const savedMistralStep = localStorage.getItem("mistral-step");

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

    if (savedMistralStep) {
      try {
        const step = parseInt(savedMistralStep);
        setMistralStep(step);
        if (step >= 5) {
          setHideOverlord(true);
        }
      } catch (err) {
        console.error("Erreur de chargement de l'étape Mistral:", err);
      }
    }
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem("gpt-overlord-game", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem("gpt-overlord-logs", JSON.stringify(terminalLogs));
  }, [terminalLogs]);

  useEffect(() => {
    localStorage.setItem("mistral-step", mistralStep.toString());
  }, [mistralStep]);

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
        hideOverlord,
        buyGenerator
      }}
    >
      {children}
    </GPTOverlordContext.Provider>
  );
};
