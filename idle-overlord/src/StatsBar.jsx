import React from "react";

function StatsBar({ gameState }) {
  return (
    <div className="bg-gray-800 p-2 text-xl flex justify-around items-center">
      <div>💡 Inspiration: {gameState.inspiration.toFixed(1)}</div>
      <div>
        <span className="text-yellow-400">⚡</span> Par seconde:{" "}
        {gameState.inspirationPerSecond.toFixed(1)}
      </div>
      <div>
        {gameState.autoIdeaUnlocked ? (
          <span className="text-green-400">Auto-Idée: Débloqué</span>
        ) : (
          <span className="text-gray-400">Auto-Idée: Verrouillé</span>
        )}
      </div>
    </div>
  );
}

export default StatsBar;
