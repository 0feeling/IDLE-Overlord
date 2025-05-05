import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import { calculateTotalRate } from "./utils";

function InspirationRateDisplay() {
  const { gameState } = useGPTOverlord();
  const totalRate = calculateTotalRate(gameState.generators);

  return (
    <div className="bg-blue-50 p-4 rounded-md shadow-md">
      <p className="text-lg text-blue-600 font-semibold">
        Taux d'inspiration :{" "}
        <span className="font-bold">{totalRate.toFixed(2)} /s</span>
      </p>
    </div>
  );
}

export default InspirationRateDisplay;
