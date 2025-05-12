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
import CristalTerminal from "./CristalTerminal";
import CatGPTTerminal from "./CatGPTTerminal";
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

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col px-2 sm:px-4">
      <StatsBar gameState={gameState} />
      <PassiveInspiration />
      <InspirationButton />
      <UnlockAutoIdeaButton />

      {/* Conteneur principal responsive */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Colonne gauche - Terminaux */}
        <div className="lg:w-1/3 w-full flex flex-col border-b lg:border-b-0 lg:border-r border-gray-700">
          <div className="flex-1 border-b border-gray-700 max-h-[50vh] overflow-y-auto">
            <CatGPTTerminal />
          </div>
          <div className="flex-1 max-h-[50vh] overflow-y-auto">
            {gameState.cristalMode && <CristalTerminal />}
          </div>
        </div>

        {/* Colonne centrale - Éditeur + Missions */}
        <div className="lg:w-1/3 w-full flex flex-col border-b lg:border-b-0 lg:border-r border-gray-700">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <Editor gameState={gameState} setGameState={setGameState} />
          </div>
        </div>

        {/* Colonne droite - Générateurs */}
        <div className="lg:w-1/3 w-full overflow-y-auto">
          <AllGeneratorsPanel />
        </div>
      </div>

      <OverlayMessage gameState={gameState} />
    </div>
  );
}

export default App;
