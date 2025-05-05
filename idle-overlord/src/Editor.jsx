import React, { useState, useEffect } from "react";
import InspirationRateDisplay from "./InspirationRateDisplay"; // Assure-toi que le chemin est correct

function Editor({ gameState, setGameState }) {
  const [missionValidated, setMissionValidated] = useState(false);

  // Met à jour le gameState à chaque changement de code
  const handleCodeChange = (e) => {
    const newCode = e.target.value;

    setGameState((prev) => ({
      ...prev,
      code: newCode
    }));

    setMissionValidated(false); // Re-vérifie la mission si modifié
  };

  // Vérifie si le code contient une logique correcte pour valider la mission
  useEffect(() => {
    const requiredSnippet = "inspiration.amount += inspiration.perSecond";
    const code = gameState.code;

    if (code && code.includes(requiredSnippet) && !missionValidated) {
      setGameState((prev) => ({
        ...prev,
        inspiration: prev.inspiration + 0.2
      }));
      setMissionValidated(true);
    }
  }, [gameState.code, missionValidated, setGameState]);

  return (
    <div className="w-1/2 bg-gray-800 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-2 text-white">Code Editor</h2>
      <div className="text-xl text-red-400 mb-2">
        Inspiration actuelle :{" "}
        <strong>{gameState.inspiration.toFixed(2)}</strong>
      </div>

      {/* Affichage du taux d'inspiration avec le composant */}
      <InspirationRateDisplay />

      <textarea
        className="w-full h-96 bg-gray-700 text-white p-2 rounded-md font-mono"
        value={gameState.code}
        onChange={handleCodeChange}
      />
      {missionValidated && (
        <p className="text-green-400 mt-2">🎉 Mission validée !</p>
      )}
    </div>
  );
}

export default Editor;
