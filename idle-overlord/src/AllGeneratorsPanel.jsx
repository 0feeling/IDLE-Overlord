import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import GeneratorPanel from "./GeneratorPanel";

function AllGeneratorsPanel() {
  const { gameState, setGameState } = useGPTOverlord();
  const generators = gameState.generators;

  function buyGenerator(id) {
    const gen = generators[id];
    const cost = Math.floor(gen.baseCost * Math.pow(1.15, gen.count));

    if (gameState.inspiration < cost) return;

    setGameState((prev) => ({
      ...prev,
      inspiration: prev.inspiration - cost,
      generators: {
        ...prev.generators,
        [id]: {
          ...gen,
          count: gen.count + 1
        }
      }
    }));
  }

  return (
    <div className="p-4 bg-gray-900 border-t border-gray-700">
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
