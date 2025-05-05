import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

function UnlockAutoIdeaButton({ threshold = 10 }) {
  const { gameState, unlockAutoIdea, setGameState, logToTerminal } =
    useGPTOverlord();
  const { inspiration, autoIdeaUnlocked } = gameState;

  const handleUnlock = () => {
    if (inspiration >= threshold) {
      unlockAutoIdea();
      setGameState((prev) => ({
        ...prev,
        inspiration: prev.inspiration - threshold
      }));
      logToTerminal("GPT-Overlord: Passive generation module unlocked.");
    }
  };

  if (autoIdeaUnlocked || gameState.tutorialStep < 6) return null;

  return (
    <button
      onClick={handleUnlock}
      disabled={inspiration < threshold}
      className={`m-4 px-4 py-2 rounded ${
        inspiration >= threshold
          ? "bg-green-600 hover:bg-green-700"
          : "bg-gray-600 cursor-not-allowed"
      }`}
    >
      🔓 Débloquer GPT Auto-Idee ({threshold} 💡)
    </button>
  );
}

export default UnlockAutoIdeaButton;
