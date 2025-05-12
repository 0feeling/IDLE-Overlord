// src/components/Editor/CodeExecutor/CodeExecutor.jsx
import React from "react";
import { useGPTOverlord } from "../../../GPTOverlordContext";
import useCodeValidation from "../hooks/useCodeValidation";

export default function CodeExecutor({ editorRef }) {
  const { gameState } = useGPTOverlord();
  const { validateCode } = useCodeValidation();

  const handleExecute = () => {
    const cleanedCode = gameState.code.trim();
    const isValid = validateCode(cleanedCode, editorRef);

    if (isValid) {
      // Reset du code seulement si validation réussie
      editorRef.current.value = "";
      setGameState((prev) => ({ ...prev, code: "" }));
    }
  };

  return (
    <button
      onClick={handleExecute}
      className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
    >
      Exécuter (Ctrl+Enter)
    </button>
  );
}
