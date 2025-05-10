import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import { CheckCircle, Circle } from "lucide-react";

// Composant mémoïsé pour les missions individuelles
const MissionItem = React.memo(({ mission }) => (
  <div className="flex items-start gap-3 py-1 opacity-80 hover:opacity-100 transition-opacity">
    <div className="mt-0.5">
      {mission.validated ? (
        <CheckCircle className="text-green-400" size={16} />
      ) : (
        <Circle className="text-gray-400" size={16} />
      )}
    </div>
    <p
      className={`text-xs leading-snug ${
        mission.validated ? "text-green-400 line-through" : "text-gray-300"
      }`}
    >
      {mission.instruction}
    </p>
  </div>
));

function MissionPanel() {
  const { gameState } = useGPTOverlord();

  // Déterminer quelle liste de missions utiliser
  const missions = gameState.cristalMode
    ? gameState.cristalMissions
    : gameState.missions;

  // Déterminer l'étape actuelle
  const currentStep = gameState.cristalMode
    ? gameState.cristalStep
    : gameState.tutorialStep;

  // Mission actuelle avec fallback
  // Modifier l'affichage de la mission actuelle :
  const currentMission =
    currentStep === -1
      ? missions[0] // Étape -1 ➔ Affiche "Êtes-vous prêt à commencer l'aventure ?"
      : (missions[gameState.cristalMode ? currentStep : currentStep] ?? {
          instruction: "Liberté de code !",
          validated: false
        });

  return (
    <div className="bg-gray-800 border-t border-gray-700 max-h-64 overflow-y-auto flex flex-col">
      {/* En-tête de la mission actuelle */}
      <div className="bg-gray-900 p-3 border-b border-gray-700 sticky top-0">
        <h2 className="text-blue-300 text-xs uppercase tracking-wide font-semibold mb-1 flex items-center">
          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
          {gameState.cristalMode ? "Mission Cristal" : "Mission actuelle"}
        </h2>
        <div className="flex items-start gap-3 py-1">
          <div className="mt-0.5">
            {currentMission.validated ? (
              <CheckCircle className="text-green-400" size={18} />
            ) : (
              <Circle className="text-gray-400" size={18} />
            )}
          </div>
          <p
            className={`text-sm leading-snug ${
              currentMission.validated ? "text-green-400" : "text-white"
            }`}
          >
            {currentMission.instruction}
          </p>
        </div>
      </div>

      {/* Liste des missions précédentes */}
      <div className="p-3">
        <h3 className="text-gray-400 text-xs uppercase tracking-wide font-semibold mb-2">
          Progression
        </h3>
        <div className="space-y-2">
          {missions.map((mission, index) =>
            index >= currentStep ? null : (
              <MissionItem key={index} mission={mission} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default MissionPanel;
