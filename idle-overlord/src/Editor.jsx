import React, { useEffect, useState } from "react";

function Editor({ gameState, setGameState }) {
  const [code, setCode] = useState(
    gameState.code || "// Écrivez votre code ici\n\n"
  );

  // Synchroniser le code avec le gameState lorsqu'il change
  useEffect(() => {
    if (gameState.code !== code) {
      setCode(gameState.code);
    }
  }, [gameState.code]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);

    // Mettre à jour le gameState avec le nouveau code
    setGameState((prev) => ({
      ...prev,
      code: newCode
    }));
  };

  // Vérification du code pour les missions du tutoriel
  useEffect(() => {
    const checkCodeForTutorialSteps = () => {
      // Analyser le code pour voir s'il correspond aux étapes du tutoriel
      // Ceci est une version simplifiée, les vérifications réelles devraient être plus robustes
      const step = gameState.tutorialStep;

      // Ne pas valider automatiquement - laisser le terminal gérer la validation
    };

    checkCodeForTutorialSteps();
  }, [code, gameState.tutorialStep, setGameState]);

  return (
    <div className="w-1/3 h-full flex flex-col">
      <div className="bg-gray-800 p-2 text-sm">
        <span className="text-blue-300">editor.js</span>
      </div>
      <textarea
        className="flex-1 bg-gray-900 text-green-400 p-4 font-mono text-sm resize-none outline-none"
        value={code}
        onChange={handleCodeChange}
        spellCheck="false"
      />
    </div>
  );
}

export default Editor;
