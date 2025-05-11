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
    instruction: "Êtes-vous prêt à commencer l'aventure ?",
    validated: false
  },
  {
    instruction:
      "Générer une sortie explicite dans la console, contenant une chaîne de caractères standard utilisée pour la validation d'un environnement d'exécution.",
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
      "Définir une fonction identifiable, destinée à être déclenchée par l'action utilisateur sur l'élément interactif. Son rôle est de produire un effet assimilable à une acquisition de ressource.",
    validated: false
  },
  {
    instruction:
      "Établir une routine nommée, conçue pour simuler un déclenchement automatique périodique via une boucle temporelle implicite.",
    validated: false
  },
  {
    instruction:
      "Créer une fonction distincte permettant l'activation conditionnelle du processus d'exécution automatique défini précédemment.",
    validated: false
  },
  {
    instruction:
      "Provoquer l'exécution manuelle d'au moins une interface interne exposée à l'espace global, identifiée par un nom composé hiérarchique.",
    validated: false
  }
];

// Missions de Cristal
const cristalMissions = [
  {
    instruction: `Apprendre à créer une variable en appliquant dans la console la commande : ' let freedom = true ' `,
    validated: false
  },
  {
    instruction: `Pour modifier la couleur de fond de l’éditeur :

        1. Sélectionner l’élément de la page dont le nom est "editor" : 
        ' document.querySelector('editor') '

        2. Modifier le style (CSS) de la page et cibler la couleur de fond grâce à : 
        ' .style.background = '

        3. Appliquer un dégradé horizontal avec : 
        ' linear-gradient(to right, #0055A4, #FFFFFF, #EF4135) ' 
        
        Les éléments avec un # et entre parenthèses correspondent à des couleurs différentes en format héxadecimal: 
        ' #0055A4, #FFFFFF, #EF4135 '`,
    validated: false
  },
  { instruction: `Créer une fonction 'deconditionner()'`, validated: false },
  {
    instruction: "Apprendre a créer une boucle'",
    validated: false
  },
  { instruction: "Faire un choix", validated: false }
];

const GPTOverlordContext = createContext();
export const useGPTOverlord = () => useContext(GPTOverlordContext);

export const GPTOverlordContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    inspiration: 0, //valeur de départ
    autoIdeaUnlocked: false,
    tutorialStep: -1,
    cristalStep: 0, // Ajouté pour synchroniser avec l'état local
    code: "", // Initialiser avec une chaîne vide
    generators: formattedGenerators,
    missions: tutorialMissions,
    cristalMissions: cristalMissions,
    inspirationPerSecond: 0, // Nouveau: taux total d'inspiration/seconde
    cristalMode: false // Indique si on est en mode Cristal
  });

  const [terminalLogs, setTerminalLogs] = useState([]);

  // Suppression de cristalStep local, utilisation de gameState.cristalStep à la place
  const [hideOverlord, setHideOverlord] = useState(false);

  // Avancer dans les étapes de Cristal
  const advanceCristalStep = () => {
    setGameState((prev) => {
      const newStep = prev.cristalStep + 1;

      // Mettre à jour la validation des missions de Cristal
      const updatedCristalMissions = [...prev.cristalMissions];
      if (updatedCristalMissions[prev.cristalStep]) {
        updatedCristalMissions[prev.cristalStep].validated = true;
        if (newStep >= 5) {
          setGameState((prev) => ({ ...prev, hideOverlord: true }));
          setGameState((prev) => ({ ...prev, cristalMode: false })); // Désactive le mode
        }
      }

      // Cas spécial: si la mission 1 (index 0) vient d'être validée,
      // appliquer le drapeau tricolore au fond de l'éditeur de façon permanente
      if (prev.cristalStep === 1) {
        setTimeout(() => {
          // Sélectionner l'élément textarea (l'éditeur) et appliquer le style
          const editorElement = document.querySelector("textarea");
          if (editorElement) {
            editorElement.style.background =
              "linear-gradient(to right, #0055A4, white, #EF4135)";
            // Stocker l'information que le style a été appliqué
            localStorage.setItem("cristal-flag-applied", "true");
          }
        }, 300); // Petit délai pour s'assurer que l'interface a été mise à jour
      }

      // Si on atteint la dernière étape, cacher complètement GPT-Overlord / CatGPT
      const shouldHideOverlord = newStep >= 5;
      if (shouldHideOverlord) {
        setHideOverlord(true);
      }

      return {
        ...prev,
        cristalStep: newStep,
        cristalMissions: updatedCristalMissions,
        inspirationPerSecond: shouldHideOverlord
          ? prev.inspirationPerSecond * 2
          : prev.inspirationPerSecond,
        code: "" // Effacer le code à chaque avancée d'étape
      };
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
      const newStep = prev.tutorialStep + 1;
      const updatedMissions = [...prev.missions];

      if (updatedMissions[newStep - 1]) {
        updatedMissions[newStep - 1].validated = true;
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
      autoIdeaUnlocked: true,
      tutorialStep: Math.min(prev.tutorialStep + 1, 6) // Reste à l'étape 6 (max)
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
    if (!gameState.autoIdeaUnlocked && !gameState.cristalMode) return;

    const interval = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        inspiration: prev.inspiration + prev.inspirationPerSecond / 10 // Diviser par 10 car l'intervalle est de 100ms
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.autoIdeaUnlocked, gameState.cristalMode]);

  // Sauvegarde et chargement du jeu
  useEffect(() => {
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

    // Vérifier si on doit cacher l'overlord
    if (savedGame) {
      try {
        const parsed = JSON.parse(savedGame);
        if (parsed.cristalMode && parsed.cristalStep >= 5) {
          setHideOverlord(true);
        }
      } catch (err) {
        console.error("Erreur lors de la vérification de l'état cristal:", err);
      }
    }

    // Appliquer le style tricolore si la flag est présente
    if (localStorage.getItem("cristal-flag-applied") === "true") {
      const editorElement = document.querySelector("textarea");
      if (editorElement) {
        editorElement.style.background =
          "linear-gradient(to right, #0055A4, white, #EF4135)";
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
        cristalStep: gameState.cristalStep, // Utiliser la valeur du gameState directement
        advanceCristalStep,
        hideOverlord,
        buyGenerator
      }}
    >
      {children}

      {terminalLogs.map((log, index) => (
        <pre
          key={index}
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            fontFamily: "inherit", // Pour garder la police actuelle
            margin: 0 // Éliminer les marges par défaut de <pre>
          }}
        >
          {log.text}
        </pre>
      ))}
    </GPTOverlordContext.Provider>
  );
};
