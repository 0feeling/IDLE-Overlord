import React, { useEffect } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

function PassiveInspiration({ rate = 0.01, interval = 1000 }) {
  const { gameState, setGameState } = useGPTOverlord();

  useEffect(() => {
    if (!gameState.autoIdeaUnlocked) return;

    const id = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        inspiration: prev.inspiration + rate
      }));
    }, interval);

    return () => clearInterval(id);
  }, [gameState.autoIdeaUnlocked, rate, interval, setGameState]);

  return null; // ce composant n'affiche rien
}

export default PassiveInspiration;
