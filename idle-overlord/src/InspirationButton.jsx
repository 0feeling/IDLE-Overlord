import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

function InspirationButton() {
  const { gameState, setGameState } = useGPTOverlord();

  const handleClick = () => {
    setGameState((prev) => ({
      ...prev,
      inspiration: prev.inspiration + 1
    }));
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    >
      +1 Inspiration ({gameState.inspiration.toFixed(1)})
    </button>
  );
}

export default InspirationButton;
