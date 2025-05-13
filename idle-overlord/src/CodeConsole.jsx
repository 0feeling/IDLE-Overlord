import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import { getStepMessages } from "./stepConsoleMessages";

export default function CodeConsole() {
  const { gameState } = useGPTOverlord();

  return (
    <div className="bg-gray-800 border-t border-gray-700 h-96 flex flex-col">
      {" "}
      {/* Hauteur doublée */}
      <div className="bg-gray-900 p-3 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-yellow-300 text-xs uppercase tracking-wide font-semibold">
          Journal de Développement
        </h2>
        <span className="text-gray-400 text-xs">v1.0.0</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 font-mono text-sm space-y-4">
        {/* Section des messages dev */}
        <div>
          <div className="text-blue-400 mb-2">// Instructions du niveau :</div>
          {gameState.stepLogs?.map((log, i) => (
            <div key={`step-${i}`} className="text-gray-300 mb-2">
              <span className="text-blue-400">⚙️ DEV:</span> {log}
            </div>
          ))}
        </div>

        {/* Section des succès utilisateur */}
        <div>
          <div className="text-green-400 mb-2">// Progression :</div>
          {getStepMessages(
            gameState.cristalMode
              ? gameState.cristalStep
              : gameState.tutorialStep,
            gameState.cristalMode
          ).map((line, index) => (
            <div key={`success-${index}`} className="text-gray-300 mb-1">
              <span className="text-green-400">✔</span> {line}
            </div>
          ))}
        </div>

        {/* Historique du code */}
        <div>
          <div className="text-green-400 mb-2">// Code validé :</div>
          <pre className="text-gray-400 whitespace-pre-wrap border border-gray-700 rounded p-2">
            {gameState.codeHistory}
          </pre>
        </div>
      </div>
    </div>
  );
}
