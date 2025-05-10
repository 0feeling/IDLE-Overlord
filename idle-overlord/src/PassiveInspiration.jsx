import React, { useEffect } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

function PassiveInspiration({ interval = 1000 }) {
  const { gameState, setGameState } = useGPTOverlord();

  useEffect(() => {
    // N'activer que si l'autoIdea est débloquée
    if (!gameState.autoIdeaUnlocked || gameState.inspirationPerSecond <= 0)
      return;

    const id = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        inspiration: prev.inspiration + prev.inspirationPerSecond
      }));
    }, interval);

    return () => clearInterval(id);
  }, [
    gameState.autoIdeaUnlocked,
    setGameState,
    interval,
    gameState.inspirationPerSecond
  ]);

  return null;
}

export default PassiveInspiration;
