import React from "react";

function StatsBar({ gameState }) {
  return (
    <div className="bg-gray-800 p-8 text-xl flex justify-around items-center">
      <div>💡 Inspiration: {gameState.inspiration.toFixed(1)}</div>
      <div>
        <span className="text-yellow-400">⚡</span> Per second:{" "}
        {Number.isInteger(gameState.inspirationPerSecond)
          ? gameState.inspirationPerSecond
          : gameState.inspirationPerSecond.toFixed(1)}
      </div>
      <div>
        {gameState.autoIdeaUnlocked ? (
          <span className="text-green-400">AutoIdea: Unlocked</span>
        ) : (
          <span className="text-gray-400">AutoIdea: Locked</span>
        )}
      </div>
    </div>
  );
}

export default StatsBar;
