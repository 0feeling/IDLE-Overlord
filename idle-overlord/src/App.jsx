import React from "react";
import Terminal from "./Terminal";
import Editor from "./Editor";
import StatsBar from "./StatsBar";
import OverlayMessage from "./OverlayMessage";
import {
  GPTOverlordContextProvider,
  useGPTOverlord
} from "./GPTOverlordContext"; // Keep the correction
import InspirationButton from "./InspirationButton";
import PassiveInspiration from "./PassiveInspiration";
import UnlockAutoIdeaButton from "./UnlockAutoIdeaButton";
import MissionPanel from "./MissionPanel";

function App() {
  return (
    <GPTOverlordContextProvider>
      <AppContent />
    </GPTOverlordContextProvider>
  );
}

function AppContent() {
  const { gameState, setGameState } = useGPTOverlord();

  const currentStep = gameState.tutorialStep;
  const currentMission = gameState.missions?.[currentStep];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative">
      <StatsBar gameState={gameState} />
      <PassiveInspiration />
      <InspirationButton />
      <UnlockAutoIdeaButton />
      <div className="flex flex-1">
        <Terminal gameState={gameState} setGameState={setGameState} />
        <Editor gameState={gameState} setGameState={setGameState} />
      </div>
      <OverlayMessage gameState={gameState} />

      {currentMission && (
        <MissionPanel
          mission={currentMission.instruction}
          isValidated={currentMission.validated}
        />
      )}
    </div>
  );
}

export default App;
