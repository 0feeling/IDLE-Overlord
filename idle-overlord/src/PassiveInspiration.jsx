import React, { useEffect } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import { calculateTotalRate } from "./utils";

function PassiveInspiration({ interval = 1000 }) {
  const { gameState, setGameState } = useGPTOverlord();
  const totalRate = calculateTotalRate(gameState.generators);

  useEffect(() => {
    if (gameState.tutorialStep < 4 || !gameState.autoIdeaUnlocked) return;

    const id = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        inspiration: prev.inspiration + totalRate
      }));
    }, interval);

    return () => clearInterval(id);
  }, [gameState.autoIdeaUnlocked, gameState.tutorialStep, interval, totalRate]);

  return null;
}

export default PassiveInspiration;
