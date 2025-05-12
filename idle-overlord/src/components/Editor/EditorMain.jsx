// src/components/Editor/EditorMain.jsx
import React, { useEffect, useRef } from "react";
import { useGPTOverlord } from "../../context/GPTOverlordContext";
import CodeExecutor from "./CodeExecutor/CodeExecutor";
import SyntaxHighlighter from "./SyntaxHighlighter/SyntaxHighlighter";
import useAutoIndent from "./hooks/useAutoIndent";
import MissionPanel from "../MissionPanel/MissionPanel";

export default function EditorMain() {
  const { gameState, setGameState } = useGPTOverlord();
  const editorRef = useRef(null);
  const { handleKeyDown } = useAutoIndent(
    editorRef,
    gameState.code,
    setGameState
  );

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [gameState.tutorialStep]);

  return (
    <div className="w-1/3 h-full flex flex-col bg-gray-800 border-r border-gray-700">
      <div className="bg-gray-900 p-3 text-sm flex justify-between items-center">
        <span className="text-blue-300">Editor.js</span>
        <CodeExecutor editorRef={editorRef} />
      </div>

      <textarea
        ref={editorRef}
        className="h-80 bg-white text-black p-4 font-mono text-sm resize-y outline-none border-b border-gray-700"
        placeholder="// Écrivez votre code ici"
        value={gameState.code}
        onChange={(e) =>
          setGameState((prev) => ({ ...prev, code: e.target.value }))
        }
        onKeyDown={handleKeyDown}
        spellCheck="false"
      />

      <SyntaxHighlighter code={gameState.code} />
      <MissionPanel />
    </div>
  );
}
