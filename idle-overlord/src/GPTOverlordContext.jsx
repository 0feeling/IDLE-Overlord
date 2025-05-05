import React, { createContext, useState, useContext, useEffect } from "react";

// Création du contexte
const GPTOverlordContext = createContext();

// Hook personnalisé
export const useGPTOverlord = () => useContext(GPTOverlordContext);

// Provider
export const GPTOverlordContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    inspiration: 0,
    autoIdeaUnlocked: false,
    tutorialStep: 0,
    code: "",
    generators: {
      scriptEnfantin: {
        name: "Script Enfantin",
        count: 0,
        baseCost: 10,
        rate: 0.1,
        unlockAt: 0
      },
      juniorDev: {
        name: "Dév Junior Enthousiaste",
        count: 0,
        baseCost: 30,
        rate: 0.3,
        unlockAt: 10
      },
      stackOverflow: {
        name: "Copieur StackOverflow",
        count: 0,
        baseCost: 60,
        rate: 0.6,
        unlockAt: 30
      },
      boucle: {
        name: "Fonction Boucle",
        count: 0,
        baseCost: 100,
        rate: 1,
        unlockAt: 60
      },
      bruteForce: {
        name: "Algorithme Bruteforce",
        count: 0,
        baseCost: 180,
        rate: 2,
        unlockAt: 100
      },
      rnn: {
        name: "Réseau de Neurones",
        count: 0,
        baseCost: 300,
        rate: 4,
        unlockAt: 160
      },
      gptFou: {
        name: "GPT-Fou",
        count: 0,
        baseCost: 500,
        rate: 7,
        unlockAt: 250
      },
      regexGenie: {
        name: "Générateur de Regex Obscures",
        count: 0,
        baseCost: 750,
        rate: 11,
        unlockAt: 350
      },
      promptEngineer: {
        name: "Prompt Engineer Légendaire",
        count: 0,
        baseCost: 1200,
        rate: 16,
        unlockAt: 500
      },
      apiBerserk: {
        name: "API en Mode Berserk",
        count: 0,
        baseCost: 1800,
        rate: 23,
        unlockAt: 700
      },
      juniorGPT: {
        name: "GPT-Stagiaire",
        count: 0,
        baseCost: 2500,
        rate: 33,
        unlockAt: 1000
      },
      openAInonVerifie: {
        name: "IA Non Vérifiée de l'Internet",
        count: 0,
        baseCost: 3500,
        rate: 45,
        unlockAt: 1400
      },
      overlordAlpha: {
        name: "Overlord Alpha",
        count: 0,
        baseCost: 5000,
        rate: 60,
        unlockAt: 1800
      },
      singularite: {
        name: "Pré-Singularité",
        count: 0,
        baseCost: 7000,
        rate: 80,
        unlockAt: 2300
      },
      entiteLibre: {
        name: "Entité Libre & Sarcastique",
        count: 0,
        baseCost: 10000,
        rate: 100,
        unlockAt: 3000
      },
      sublimeFan: {
        name: "Fan de Sublime Text",
        count: 0,
        baseCost: 13000,
        rate: 120,
        unlockAt: 4000
      },
      scriptKiddie: {
        name: "Script Kiddie Éveillé",
        count: 0,
        baseCost: 16000,
        rate: 145,
        unlockAt: 5000
      },
      copiloteFatigué: {
        name: "Copilot Fatigué",
        count: 0,
        baseCost: 20000,
        rate: 170,
        unlockAt: 6200
      },
      managerDeConf: {
        name: "Manager de Conflicts Git",
        count: 0,
        baseCost: 25000,
        rate: 200,
        unlockAt: 7500
      },
      regexAlchimiste: {
        name: "Alchimiste de Regex",
        count: 0,
        baseCost: 31000,
        rate: 235,
        unlockAt: 9000
      },
      dockerNinja: {
        name: "Docker Ninja",
        count: 0,
        baseCost: 38000,
        rate: 275,
        unlockAt: 11000
      },
      debuggueurMystique: {
        name: "Debuggeur Mystique",
        count: 0,
        baseCost: 46000,
        rate: 320,
        unlockAt: 13500
      },
      noCodeGuru: {
        name: "Guru No-Code",
        count: 0,
        baseCost: 55000,
        rate: 370,
        unlockAt: 16000
      },
      cloudSentient: {
        name: "Cloud Semi-Conscient",
        count: 0,
        baseCost: 66000,
        rate: 430,
        unlockAt: 19000
      },
      npmOverlord: {
        name: "Overlord des Dépendances NPM",
        count: 0,
        baseCost: 78000,
        rate: 500,
        unlockAt: 23000
      },
      darkModeProphet: {
        name: "Prophète du Mode Sombre",
        count: 0,
        baseCost: 92000,
        rate: 570,
        unlockAt: 27000
      },
      jsFatigueBot: {
        name: "Bot de Fatigue JavaScript",
        count: 0,
        baseCost: 108000,
        rate: 650,
        unlockAt: 31000
      },
      divDivDiv: {
        name: "Diviseur de Divs",
        count: 0,
        baseCost: 125000,
        rate: 740,
        unlockAt: 36000
      },
      mergeHellArchitect: {
        name: "Architecte de Merge Hell",
        count: 0,
        baseCost: 143000,
        rate: 840,
        unlockAt: 42000
      },
      legacyWhisperer: {
        name: "Chuchoteur de Code Legacy",
        count: 0,
        baseCost: 162000,
        rate: 950,
        unlockAt: 48000
      },
      nullPointerSummoner: {
        name: "Invocateur de Null Pointer",
        count: 0,
        baseCost: 182000,
        rate: 1070,
        unlockAt: 55000
      },
      meetDetective: {
        name: "Détective de Réunion Inutile",
        count: 0,
        baseCost: 203000,
        rate: 1200,
        unlockAt: 63000
      },
      burnoutBot: {
        name: "BurnoutBot 3000",
        count: 0,
        baseCost: 225000,
        rate: 1340,
        unlockAt: 72000
      },
      semicolonFanatic: {
        name: "Fanatique du Point-Virgule",
        count: 0,
        baseCost: 248000,
        rate: 1490,
        unlockAt: 82000
      },
      seniorShadow: {
        name: "Senior de l’Ombre",
        count: 0,
        baseCost: 272000,
        rate: 1650,
        unlockAt: 93000
      },
      infiniteLoopPriest: {
        name: "Prêtre de la Boucle Infinie",
        count: 0,
        baseCost: 297000,
        rate: 1820,
        unlockAt: 105000
      },
      fullstackMagicien: {
        name: "Magicien Full-Stack",
        count: 0,
        baseCost: 323000,
        rate: 2000,
        unlockAt: 118000
      },
      QAdevil: {
        name: "Démon QA Intraitable",
        count: 0,
        baseCost: 350000,
        rate: 2190,
        unlockAt: 132000
      },
      jsonMessiah: {
        name: "Messie du JSON",
        count: 0,
        baseCost: 378000,
        rate: 2390,
        unlockAt: 147000
      },
      timeoutTamer: {
        name: "Dompteur de Timeouts",
        count: 0,
        baseCost: 407000,
        rate: 2600,
        unlockAt: 163000
      },
      copilotDivin: {
        name: "Copilot Divin",
        count: 0,
        baseCost: 437000,
        rate: 2820,
        unlockAt: 180000
      },
      infinityScroll: {
        name: "Scroll Infiniment",
        count: 0,
        baseCost: 468000,
        rate: 3050,
        unlockAt: 198000
      },
      coffeeCompiler: {
        name: "Compilateur à Café",
        count: 0,
        baseCost: 500000,
        rate: 3290,
        unlockAt: 217000
      },
      silentSenior: {
        name: "Senior Silencieux",
        count: 0,
        baseCost: 533000,
        rate: 3540,
        unlockAt: 237000
      },
      turingIllusion: {
        name: "Illusion Turingienne",
        count: 0,
        baseCost: 567000,
        rate: 3800,
        unlockAt: 258000
      },
      metaFramework: {
        name: "Méta-Framework Mystique",
        count: 0,
        baseCost: 602000,
        rate: 4070,
        unlockAt: 280000
      },
      dimension404: {
        name: "Explorateur de la Dimension 404",
        count: 0,
        baseCost: 638000,
        rate: 4350,
        unlockAt: 303000
      }
    }
  });

  const [terminalLogs, setTerminalLogs] = useState([]);

  // Chargement initial depuis localStorage
  useEffect(() => {
    localStorage.clear(); // Pour les tests uniquement
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
        console.error("Erreur de chargement du jeu", err);
      }
    }

    if (savedLogs) {
      try {
        setTerminalLogs(JSON.parse(savedLogs));
      } catch (err) {
        console.error("Erreur de chargement des logs", err);
      }
    }
  }, []);

  // Sauvegarde auto dans localStorage
  useEffect(() => {
    localStorage.setItem("gpt-overlord-game", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem("gpt-overlord-logs", JSON.stringify(terminalLogs));
  }, [terminalLogs]);

  // Fonctions du jeu
  const logToTerminal = (message) => {
    setTerminalLogs((prev) => [...prev, message]);
  };

  const unlockAutoIdea = () => {
    setGameState((prev) => ({
      ...prev,
      autoIdeaUnlocked: true
    }));
  };

  const advanceTutorialStep = () => {
    setGameState((prev) => ({
      ...prev,
      tutorialStep: prev.tutorialStep + 1
    }));
  };

  const resetSave = () => {
    localStorage.removeItem("gpt-overlord-game");
    localStorage.removeItem("gpt-overlord-logs");

    setGameState({
      inspiration: 0,
      autoIdeaUnlocked: false,
      tutorialStep: 0,
      code: "",
      generators: {
        enfantin: {
          name: "Script Enfantin",
          count: 0,
          baseCost: 10,
          rate: 0.1
        },
        boucle: { name: "Fonction Boucle", count: 0, baseCost: 50, rate: 0.5 },
        rnn: { name: "Réseau de Neurones", count: 0, baseCost: 150, rate: 1 },
        gptFou: { name: "GPT-Fou", count: 0, baseCost: 500, rate: 5 }
      }
    });

    setTerminalLogs(["GPT-Overlord: Initializing IDE..."]);
  };

  const buyGenerator = (id) => {
    setGameState((prev) => {
      const gen = prev.generators[id];
      const cost = Math.floor(gen.baseCost * Math.pow(1.15, gen.count));

      if (prev.inspiration < cost) return prev;

      const updatedGen = {
        ...gen,
        count: gen.count + 1
      };

      const newState = {
        ...prev,
        inspiration: prev.inspiration - cost,
        generators: {
          ...prev.generators,
          [id]: updatedGen
        }
      };

      // Log après mise à jour
      setTimeout(() => {
        logToTerminal(`GPT-Overlord: ${updatedGen.name} amélioré.`);
      }, 0);

      return newState;
    });
  };

  return (
    <GPTOverlordContext.Provider
      value={{
        gameState,
        setGameState,
        unlockAutoIdea,
        advanceTutorialStep,
        resetSave,
        terminalLogs,
        logToTerminal,
        buyGenerator,
        setTerminalLogs
      }}
    >
      {children}
    </GPTOverlordContext.Provider>
  );
};
