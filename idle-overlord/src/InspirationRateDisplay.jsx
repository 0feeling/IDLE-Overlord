import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

function InspirationRateDisplay() {
  const { gameState } = useGPTOverlord();
  const totalRate = gameState.inspirationPerSecond;

  return (
    <div className="bg-blue-950 p-2 rounded-md shadow-md mb-2 text-white">
      <p className="text-lg font-semibold">
        Taux d'inspiration :{" "}
        <span className="font-bold">{totalRate.toFixed(2)} 💡/s</span>
      </p>
    </div>
  );
}

export default InspirationRateDisplay;
