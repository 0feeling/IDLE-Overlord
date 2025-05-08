import React, { createContext, useState, useContext, useEffect } from "react";
import generatorsData from "./generatorsData"; // Import des données des générateurs

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
      "Générer une sortie explicite dans la console, contenant une chaîne de caractères standard utilisée pour la validation d’un environnement d’exécution.",
    validated: false
  },
  {
    instruction:
      "Déclarer une entité procédurale nommée selon la convention camelCase, chargée de rendre accessible une interface bloquée initialement.",
    validated: false
  },
  {
    instruction:
      "Ajouter à la structure du document HTML un élément interactif de type bouton affichant une instruction textuelle explicite.",
    validated: false
  },
  {
    instruction:
      "Définir une fonction identifiable, destinée à être déclenchée par l’action utilisateur sur l’élément interactif. Son rôle est de produire un effet assimilable à une acquisition de ressource.",
    validated: false
  },
  {
    instruction:
      "Établir une routine nommée, conçue pour simuler un déclenchement automatique périodique via une boucle temporelle implicite.",
    validated: false
  },
  {
    instruction:
      "Créer une fonction distincte permettant l’activation conditionnelle du processus d’exécution automatique défini précédemment.",
    validated: false
  },
  {
    instruction:
      "Provoquer l’exécution manuelle d’au moins une interface interne exposée à l’espace global, identifiée par un nom composé hiérarchique.",
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
    inspiration: 0, //valeur de départ
    autoIdeaUnlocked: false,
    tutorialStep: 0,
    code: "", // Initialiser avec une chaîne vide
    generators: formattedGenerators,
    missions: tutorialMissions,
    mistralMissions: mistralMissions,
    inspirationPerSecond: 0, // Nouveau: taux total d'inspiration/seconde
    mistralMode: false // Indique si on est en mode Mistral
  });

  const [terminalLogs, setTerminalLogs] = useState([
    {
      text: `— Chargement de CatGPT —\n\n...Initialisation en douceur...\n\nBonjour, mon ami ! Je suis CatGPT 🐾 ! Ton compagnon d’aventure numérique.\n\nJe suis là pour t’aider, te guider pas à pas et t’encourager à chaque étape.\n\nTu vas bientôt découvrir des défis conçus pour t’amuser avec ta logique,\nréveiller ta curiosité et stimuler ta créativité ✨\n\nN’aie pas peur : tu n’es jamais seul !\n\nSuis les instructions, fais de ton mieux, et surtout... fais-toi confiance.\n\nEt si tu bloques ? Je serai toujours là ! Prêt à t’épauler !\n\nOn va apprendre ensemble ! Tranquillement, mais sûrement 💡💛`,
      source: "gpt"
    }
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
          mistralMode: true,
          code: "" // Effacer le code à chaque avancée d'étape
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
          mistralMissions: updatedMistralMissions,
          code: "" // Effacer le code à chaque avancée d'étape
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
        missions: updatedMissions,
        code: "" // Assurer que le code est effacé à chaque avancée d'étape
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
      {terminalLogs.map((log, index) => (
        <div
          key={index}
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          {log.text.split("\n").map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      ))}
    </GPTOverlordContext.Provider>
  );
};
