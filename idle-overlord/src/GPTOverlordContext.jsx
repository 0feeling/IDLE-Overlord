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
    code: ""
  });

  const [terminalLogs, setTerminalLogs] = useState([
    "GPT-Overlord: Initializing IDE..."
  ]);

  // Chargement initial depuis localStorage
  useEffect(() => {
    const savedGame = localStorage.getItem("gpt-overlord-game");
    if (savedGame) {
      try {
        const parsed = JSON.parse(savedGame);
        setGameState((prev) => ({
          ...prev,
          ...parsed
        }));
      } catch (err) {
        console.error("Erreur de chargement localStorage", err);
      }
    }

    const savedLogs = localStorage.getItem("gpt-overlord-logs");
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
    setTerminalLogs((prevLogs) => [...prevLogs, message]);
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
      code: ""
    });

    setTerminalLogs(["GPT-Overlord: Initializing IDE..."]);
  };

  return (
    <GPTOverlordContext.Provider
      value={{
        gameState,
        setGameState,
        unlockAutoIdea,
        terminalLogs,
        logToTerminal,
        advanceTutorialStep,
        resetSave,
        setTerminalLogs // si besoin dans des composants externes
      }}
    >
      {children}
    </GPTOverlordContext.Provider>
  );
};
