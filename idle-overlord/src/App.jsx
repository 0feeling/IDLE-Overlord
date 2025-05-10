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
import AllGeneratorsPanel from "./AllGeneratorsPanel";

function App() {
  return (
    <GPTOverlordContextProvider>
      <AppContent />
    </GPTOverlordContextProvider>
  );
}

function AppContent() {
  const { gameState, setGameState } = useGPTOverlord();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative">
      <StatsBar gameState={gameState} />
      <PassiveInspiration />
      <InspirationButton />
      <UnlockAutoIdeaButton />

      <div className="flex flex-1">
        <Terminal />
        <Editor gameState={gameState} setGameState={setGameState} />
        <div className="w-1/3 overflow-auto">
          <AllGeneratorsPanel />
        </div>
      </div>

      <OverlayMessage gameState={gameState} />
    </div>
  );
}

export default App;
