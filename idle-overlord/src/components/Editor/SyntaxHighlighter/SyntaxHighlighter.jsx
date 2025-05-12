// src/components/Editor/SyntaxHighlighter/SyntaxHighlighter.jsx
import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";

const SyntaxHighlighter = ({ code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className="language-javascript bg-gray-900 p-3 rounded-md">
      <code className="language-javascript text-sm">{code}</code>
    </pre>
  );
};

export default SyntaxHighlighter;
