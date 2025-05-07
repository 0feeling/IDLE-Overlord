import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import GeneratorPanel from "./GeneratorPanel";

function AllGeneratorsPanel() {
  const { gameState, buyGenerator } = useGPTOverlord();
  const generators = gameState.generators;

  return (
    <div className="p-4 bg-gray-900 border-t border-gray-700 overflow-y-auto max-h-96">
      <h2 className="text-xl font-bold mb-2">Générateurs IA</h2>
      {Object.entries(generators).map(([id, data]) => (
        <GeneratorPanel
          key={id}
          id={id}
          data={data}
          inspiration={gameState.inspiration}
          buyGenerator={buyGenerator}
        />
      ))}
    </div>
  );
}

export default AllGeneratorsPanel;
