import React from "react";

function StatsBar({ gameState }) {
  return (
    <div className="bg-gray-700 p-2 text-sm flex justify-between items-center">
      <div>Inspiration: {gameState.inspiration.toFixed(1)}</div>
      <div>Auto-Idée: {gameState.autoIdeaUnlocked ? "Unlocked" : "Locked"}</div>
    </div>
  );
}

export default StatsBar;
