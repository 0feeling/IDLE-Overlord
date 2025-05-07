import React, { useState, useEffect } from "react";
import InspirationRateDisplay from "./InspirationRateDisplay";
import { useGPTOverlord } from "./GPTOverlordContext";

function Editor({ gameState, setGameState }) {
  const [missionValidated, setMissionValidated] = useState(false);
  const { logToTerminal } = useGPTOverlord();

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
    // Différentes conditions selon l'étape
    const step = gameState.tutorialStep;
    const code = gameState.code;
    let validated = false;

    if (step === 0 && code.includes('console.log("Hello World!")')) {
      validated = true;
    } else if (step === 1 && /function\s+unlockButton/.test(code)) {
      validated = true;
    } else if (step === 2 && /<button[^>]*>/.test(code)) {
      validated = true;
    } else if (step === 3 && /function\s+gainInspiration\(\)/.test(code)) {
      validated = true;
    } else if (step === 4 && /function\s+autoClick\(\)/.test(code)) {
      validated = true;
    } else if (step === 5 && /function\s+unlockAutoIdea\(\)/.test(code)) {
      validated = true;
    }

    if (validated && !missionValidated) {
      // Donner une récompense pour avoir validé la mission
      setGameState((prev) => ({
        ...prev,
        inspiration: prev.inspiration + 5
      }));

      logToTerminal("Code validé! +5 inspiration accordée!");
      setMissionValidated(true);
    }
  }, [
    gameState.code,
    gameState.tutorialStep,
    missionValidated,
    setGameState,
    logToTerminal
  ]);

  return (
    <div className="w-1/2 bg-gray-800 p-4 overflow-y-auto flex flex-col">
      <h2 className="text-xl font-bold mb-2 text-white">Code Editor</h2>
      <div className="text-xl text-red-400 mb-2">
        Inspiration actuelle :{" "}
        <strong>{gameState.inspiration.toFixed(2)}</strong>
      </div>

      {/* Affichage du taux d'inspiration avec le composant */}
      <InspirationRateDisplay />

      <textarea
        className="w-full h-96 bg-gray-700 text-white p-2 rounded-md font-mono flex-grow"
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
