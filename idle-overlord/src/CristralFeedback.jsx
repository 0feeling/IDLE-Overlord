import React from "react";

export default function CristralFeedback({ messages }) {
  return (
    <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-600 p-3 rounded text-sm font-mono text-white animate-pulse border border-blue-200 shadow-lg">
      {messages.map((msg, index) => (
        <pre
          key={index}
          className="mb-2"
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            fontFamily: "inherit",
            margin: 0,
            backgroundColor: "transparent"
          }}
        >
          {msg}
        </pre>
      ))}
    </div>
  );
}
