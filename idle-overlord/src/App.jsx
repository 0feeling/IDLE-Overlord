import React from "react";
import "./index.css";
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
import CristalTerminal from "./CristalTerminal";
import CatGPTTerminal from "./CatGPTTerminal";
import MissionPanel from "./MissionPanel";
import CodeConsole from "./CodeConsole";

function App() {
  return (
    <GPTOverlordContextProvider>
      <AppContent />
    </GPTOverlordContextProvider>
  );
}

function AppContent() {
  const { gameState } = useGPTOverlord();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col px-2 sm:px-4">
      <StatsBar gameState={gameState} />
      <PassiveInspiration />
      <InspirationButton />
      <UnlockAutoIdeaButton />

      <div className="flex-1 flex flex-col lg:flex-row gap-2 mt-2">
        {/* Colonne gauche - Terminaux */}
        <div className="lg:w-1/3 flex flex-col border border-gray-700 rounded-lg overflow-hidden">
          <div className="flex-1">
            <CatGPTTerminal />
          </div>
          <div className="flex-1 border-t border-gray-700">
            {gameState.cristalMode && <CristalTerminal />}
          </div>
        </div>

        {/* Colonne centrale - Éditeur + Console */}
        {/* Colonne centrale - Éditeur + Console */}
        <div className="lg:w-1/3 flex flex-col">
          <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
            <Editor /> {/* Suppression des props */}
          </div>
          <div className="h-[500px] border border-gray-700 rounded-lg mt-2">
            <CodeConsole />
          </div>
        </div>

        {/* Colonne droite - Mission + Générateurs */}
        <div className="lg:w-1/3 flex flex-col border border-gray-700 rounded-lg overflow-hidden">
          <MissionPanel />
          <div className="flex-1 min-h-[300px] max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
            <AllGeneratorsPanel />
          </div>
        </div>
      </div>

      <OverlayMessage gameState={gameState} />
    </div>
  );
}

export default App;
