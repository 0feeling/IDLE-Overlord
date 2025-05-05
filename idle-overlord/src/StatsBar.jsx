import React from "react";

function StatsBar({ gameState }) {
  return (
    <div className="bg-gray-700 p-2 text-xl flex justify-around items-center">
      <div>Inspirations Totales: {gameState.inspiration.toFixed(1)}</div>
      <div>
        {" "}
        Auto-Idée: {gameState.autoIdeaUnlocked ? "Unlocked" : "Locked"}
      </div>
    </div>
  );
}

export default StatsBar;
