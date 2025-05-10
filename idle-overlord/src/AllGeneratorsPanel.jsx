import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import GeneratorPanel from "./GeneratorPanel";
import InspirationRateDisplay from "./InspirationRateDisplay";

function AllGeneratorsPanel() {
  const { gameState, buyGenerator } = useGPTOverlord();
  const { generators, inspiration } = gameState;

  // Fonction qui détermine si un générateur doit être affiché
  // Montre seulement les générateurs que le joueur peut voir (basé sur la progression)
  const shouldShowGenerator = (genId) => {
    const highestUnlocked = Math.max(
      ...Object.keys(generators)
        .filter((id) => generators[id].count > 0 || generators[id].unlocked)
        .map(Number)
    );
    return genId <= highestUnlocked + 3;
  };

  return (
    <div className="bg-gray-900 p-4 overflow-y-auto h-full">
      <h2 className="text-xl font-bold mb-4">
        Générateurs Automatiques d'Inspirations
      </h2>

      <InspirationRateDisplay />

      <div className="space-y-2">
        {Object.entries(generators)
          .filter(([id]) => shouldShowGenerator(Number(id)))
          .map(([id, data]) => (
            <GeneratorPanel
              key={id}
              id={id}
              data={data}
              inspiration={inspiration}
              buyGenerator={buyGenerator}
            />
          ))}
      </div>
    </div>
  );
}

export default AllGeneratorsPanel;
