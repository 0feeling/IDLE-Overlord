import React, { createContext, useState, useContext, useEffect } from "react";
import generatorsData from "./generatorsData"; // Import des données des générateurs
import { ValidationService } from "./ValidationService";

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

// Missions du tutoriel de CatGPT
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

// Instructions pour Missions de Cristal
const cristalMissions = [
  {
    instruction:
      'Une variable est comparable à une boîte numérique que l’on nomme à l’aide d’une ou plusieurs lettres.\nElle permet de stocker une valeur afin de pouvoir la réutiliser ou la modifier plus tard :\n\n\t    1. Pour créer / déclarer une variable, on utilise le mot-clé let.\n\n\t    2. Ce mot-clé est suivi d’un nom : il doit commencer par une lettre, ne contenir aucun espace, et ne pas être un mot réservé.\n\n\t    3. Le symbole = permet d’assigner une valeur à cette variable.\n\n\t    4. Cette valeur peut être un texte (ex. "message"), un nombre (ex. 3.14), ou un booléen, c’est-à-dire une valeur logique comme true (vrai) ou false (faux).\n\n\t    5. L’instruction se termine par un point-virgule ;.\n\nExemple :\n    let actif = true;\nCela signifie que la variable nommée actif contient la valeur logique "vrai".',
    validated: false
  },
  {
    instruction:
      "Pour modifier la couleur de fond de l’éditeur :\n\n\t    1. Sélectionner l’élément de la page dont le nom est \"editor\" : \n\t    ' document.querySelector('editor') '\n\n\t    2. Modifier le style (CSS) de la page et cibler la couleur de fond grâce à : \n\t    ' .style.background = '\n\n\t    3. Appliquer un dégradé horizontal avec: \n\t    ' linear-gradient(to right, #0055A4, #FFFFFF, #EF4135) ' \n\t    \n\t    Les éléments avec un # et entre parenthèses correspondent à des couleurs différentes en format héxadecimal: \n\t    ' #0055A4, #FFFFFF, #EF4135 '",
    validated: false
  },
  {
    instruction:
      'Créer une fonction \' purifierLaPage \'.\n  Pour créer une fonction qui remplace certains mots en anglais dans la page par leurs équivalents français, voici la procédure à suivre :\n\n\t    1. Déclarer une fonction grâce au mot-clé :\n\t    \' function \'\n\n\t    2. Donner un nom explicite à la fonction, ici :\n\t    \'purifierLaPage \'\n\n\t    3. Ajouter des parenthèses () à la suite du nom pour signaler qu’il s’agit d’une fonction.\n\t    Même si on ne passe pas d’information à la fonction ici, les parenthèses sont toujours nécessaires.\n\n\t    4. Ouvrir une paire d’accolades {} après les parenthèses.\n\t    Elles contiendront toutes les instructions que la fonction devra exécuter.\n\n\t    5. À l’intérieur, écrire une instruction qui permet de chercher et remplacer du texte dans la page :\n\t    document.body.innerHTML = document.body.innerHTML.replace(\'MotAremplacer, )\n\n\t    6. Ajouter plusieurs .replace(...) à la suite pour modifier plusieurs expressions en anglais.\n\t    Chaque appel remplace un mot par un autre.\n\nExemple complet à recopier dans la console :\n\nfunction NameOfTheFunction() {\ndocument.body.innerHTML = document.body.innerHTML\n.replace("EnglishWord1", "MotFrançais1")\n.replace("EnglishWord2", "MotFrançais2")\n.replace("EnglishWord3", "MotFrançais3")\n.replace("EnglishWord4", "MotFrançais4")\n}',
    validated: false
  },
  {
    instruction:
      'Pour créer une boucle, il faut suivre une structure bien précise :\n\n\t    1. Commencer par le mot-clé qui permet de répéter une action :\n\t    while\n\n\t    2. Entre parenthèses, on indique une condition : tant que cette condition est vraie, la boucle continue.\n\t    Exemple : while (i < 5) répétera des instructions tant que i est inférieur à 5.\n\n\t    3. Ouvrir une accolade { pour écrire les instructions à répéter.\n\n\t    4. À l’intérieur, écrire ce que l\'on veut répéter, par exemple une instruction qui affiche un message :\n\t    console.log("Bonjour");\n\n\t    5. Fermer l’accolade } pour terminer la boucle.\n\n\t    6. ⚠️ Attention : il faut toujours prévoir une condition qui permette d’arrêter la boucle.\n\t    Sinon, elle tourne sans fin cela peut bloquer complètement le programme, qui répète sans cesse la même instruction, ou bien même faire crasher l’ordinateur de l\'utilisateur.\n\n\t    Exemple complet :\n\n\t    let i = 0;\n\t    while (i < 5) {\n\t      console.log("Tour " + i);\n\t      i++;\n\t    }',
    validated: false
  },
  {
    instruction: "Faire un Choix",
    validated: false
  }
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
    stepLogs: [],
    cristalMode: false, // Indique si on est en mode Cristal
    codeHistory: ""
  });

  const clearTerminalLogsBySource = (source) => {
    setTerminalLogs((prev) => prev.filter((log) => log.source !== source));
  };

  const addDevLog = (message) => {
    setGameState((prev) => ({
      ...prev,
      stepLogs: [...prev.stepLogs, message]
    }));
  };

  const [terminalLogs, setTerminalLogs] = useState([]);

  // Suppression de cristalStep local, utilisation de gameState.cristalStep à la place
  const [hideOverlord, setHideOverlord] = useState(false);

  // Avancer dans les étapes de Cristal
  const advanceCristalStep = () => {
    setGameState((prev) => {
      const newStep = prev.cristalStep + 1;

      // Mettre à jour la validation des missions de Cristal
      const updatedCristalMissions = [...prev.cristalMissions];
      if (prev.cristalStep === 1) {
        const editor = document.querySelector("textarea");
        if (editor?.style.background.includes("linear-gradient")) {
          updatedCristalMissions[1].validated = true;
        }
      }
      if (updatedCristalMissions[prev.cristalStep]) {
        updatedCristalMissions[prev.cristalStep].validated = true;

        if (newStep >= 5) {
          setGameState((prev) => ({
            ...prev,
            hideOverlord: true,
            cristalMode: false
          }));
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
  const [approximationLogs, setApproximationLogs] = useState([]);
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

      // Valider la mission actuelle
      if (updatedMissions[newStep]) {
        updatedMissions[newStep].validated = true;

        return {
          ...prev,
          tutorialStep: newStep,
          missions: updatedMissions,
          stepLogs: [],
          codeHistory: prev.codeHistory + "\n" + prev.code,
          code: ""
        };
      }
      return prev;
    });
  };

  // Fonction pour déverrouiller l'auto-idée
  const unlockAutoIdea = () => {
    setGameState((prev) => ({
      ...prev,
      autoIdeaUnlocked: true,
      tutorialStep: Math.min(prev.tutorialStep + 1, 6), // Reste à l'étape 6 (max)
      codeHistory:
        prev.codeHistory +
        "\n// Auto-idée débloquée!\n" +
        "function autoClick() {\n" +
        "  setInterval(gainInspiration, 1000);\n" +
        "}"
    }));
  };

  // Fonction pour ajouter des logs au terminal
  const logToTerminal = (message) => {
    setTerminalLogs((prev) => {
      // Nettoyer les anciens messages du même type
      const cleaned = prev.filter((log) => log.source !== message.source);
      return [...cleaned, message];
    });
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
        clearTerminalLogsBySource,
        cristalStep: gameState.cristalStep, // Utiliser la valeur du gameState directement
        advanceCristalStep,
        hideOverlord,
        buyGenerator,
        addDevLog,
        approximationLogs,
        setApproximationLogs
      }}
    >
      {children}
    </GPTOverlordContext.Provider>
  );
};
