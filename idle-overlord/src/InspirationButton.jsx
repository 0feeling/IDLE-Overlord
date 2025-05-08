import React, { useState } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

function InspirationButton() {
  const { gameState, setGameState } = useGPTOverlord();
  const [floatingTexts, setFloatingTexts] = useState([]);

  const handleClick = () => {
    const id = Date.now();
    const rotation = Math.random() * 10 - 5; // -5° à +5°
    setFloatingTexts((prev) => [...prev, { id, rotation }]);

    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 1000);

    setGameState((prev) => ({
      ...prev,
      inspiration: prev.inspiration + 1
    }));
  };

  if (gameState.tutorialStep < 3) return null;

  return (
    <div className="flex justify-center items-center mt-6 mb-6">
      <div className="relative inline-block">
        {/* Floating +1 text */}
        {floatingTexts.map(({ id, rotation }) => (
          <span
            key={id}
            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
            className="absolute left-1/2 top-0 text-yellow-300 text-2xl font-extrabold animate-float pointer-events-none select-none"
          >
            +1 💫
          </span>
        ))}

        <button
          onClick={handleClick}
          disabled={gameState.tutorialStep < 4}
          className={`rounded text-black p-6 font-semibold transition-transform duration-100 ease-out transform ${
            gameState.tutorialStep >= 4
              ? "bg-yellow-500 hover:bg-yellow-600 active:scale-95 animate-pulse"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          💡 Générateur Manuel d'Inspiration 💡
        </button>
      </div>
    </div>
  );
}

export default InspirationButton;
