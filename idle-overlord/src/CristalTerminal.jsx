// CristalTerminal.jsx
import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import CristalFeedback from "./CristalFeedback";
import CristalMissionTerminal from "./CristalMissionTerminal";

export default function CristalTerminal() {
  const { gameState, terminalLogs } = useGPTOverlord(); // Une seule déclaration
  const [cristalMessages, setCristalMessages] = React.useState([]);
  const terminalRef = React.useRef(null);

  React.useEffect(() => {
    if (gameState.cristalMode) {
      const filtered = terminalLogs
        .filter((log) => log.source === "cristal")
        .map((log) => log.text);
      setCristalMessages(filtered);
    }
  }, [terminalLogs, gameState.cristalMode]);

  React.useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [cristalMessages]);

  return (
    <div className="flex flex-col bg-gray-900 border-r border-blue-800 h-full">
      <div className="bg-blue-900 px-4 py-2 border-b border-blue-700">
        <span className="font-mono text-sm tracking-wide text-blue-400">
          CRISTAL_TERMINAL v1.3.7
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        <CristalMissionTerminal />

        <div
          ref={terminalRef}
          className="bg-gray-800 rounded-lg border border-blue-700 p-3 space-y-3 min-h-32 max-h-[50vh]"
        >
          <CristalFeedback messages={cristalMessages} />
        </div>
      </div>

      <div className="bg-blue-900 px-4 py-2 text-xs font-mono border-t border-blue-700 text-blue-400">
        {gameState.cristalMode
          ? `STEP: ${gameState.cristalStep + 1}/5`
          : `STEP: ${gameState.tutorialStep + 1}/7`}
      </div>
    </div>
  );
}
