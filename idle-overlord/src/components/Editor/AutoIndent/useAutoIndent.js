// src/components/Editor/hooks/useAutoIndent.js
import { useState } from "react";

export default function useAutoIndent(editorRef, code, setGameState) {
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setGameState((prev) => ({ ...prev, code: newCode }));

      setTimeout(() => {
        editorRef.current.selectionStart = start + 2;
        editorRef.current.selectionEnd = start + 2;
      }, 0);
    }
  };

  return { handleKeyDown };
}
