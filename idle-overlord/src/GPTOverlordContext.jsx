import React, { createContext, useState, useContext, useEffect } from "react";
import generatorsData from "./GeneratorsData"; // <-- Ajout ici

const GPTOverlordContext = createContext();
export const useGPTOverlord = () => useContext(GPTOverlordContext);

export const GPTOverlordContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    inspiration: 0,
    autoIdeaUnlocked: false,
    tutorialStep: 0,
    code: "",
    generators: generatorsData // <-- Utilisation ici
  });

  const [terminalLogs, setTerminalLogs] = useState([]);

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

  return (
    <GPTOverlordContext.Provider
      value={{ gameState, setGameState, terminalLogs, setTerminalLogs }}
    >
      {children}
    </GPTOverlordContext.Provider>
  );
};
