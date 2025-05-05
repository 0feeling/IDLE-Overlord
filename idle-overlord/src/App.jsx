import React from "react";
import "./index.css";
import Terminal from "./Terminal";
import Editor from "./Editor";
import StatsBar from "./StatsBar";
import OverlayMessage from "./OverlayMessage";
import {
  GPTOverlordContextProvider,
  useGPTOverlord
} from "./GPTOverlordContext";
import InspirationButton from "./InspirationButton";
import PassiveInspiration from "./PassiveInspiration";
import UnlockAutoIdeaButton from "./UnlockAutoIdeaButton";
import MissionPanel from "./MissionPanel";
import AllGeneratorsPanel from "./AllGeneratorsPanel";
import GeneratorPanel from "./GeneratorPanel";

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

  function buyGenerator(id) {
    setGameState((prev) => {
      const gen = prev.generators[id];
      const cost = Math.floor(gen.baseCost * Math.pow(1.15, gen.count));
      if (prev.inspiration < cost) return prev;

      return {
        ...prev,
        inspiration: prev.inspiration - cost,
        generators: {
          ...prev.generators,
          [id]: {
            ...gen,
            count: gen.count + 1
          }
        }
      };
    });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative">
      <StatsBar gameState={gameState} />
      <PassiveInspiration />
      <InspirationButton />
      <UnlockAutoIdeaButton />
      <div className="flex flex-1">
        <Terminal gameState={gameState} setGameState={setGameState} />
        <Editor gameState={gameState} setGameState={setGameState} />
        <div className="w-1/3 p-4">
          <h2 className="text-xl mb-2 font-bold">Automatisations</h2>
          {Object.entries(gameState.generators).map(([id, data]) => (
            <GeneratorPanel
              key={id}
              id={id}
              data={data}
              inspiration={gameState.inspiration}
              buyGenerator={buyGenerator}
            />
          ))}
        </div>
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
