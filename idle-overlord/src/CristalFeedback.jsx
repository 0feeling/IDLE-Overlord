import React from "react";

export default function CristalFeedback({ messages }) {
  return (
    <div className="text-blue-300 font-mono text-sm space-y-2">
      <div className="bg-gray-900 p-2 rounded-t border-b border-blue-700">
        <span className="text-blue-400">⚜️ Cristal.ia — Helper</span>
      </div>

      <div className="overflow-y-auto max-h-[50vh] pr-2">
        {messages.map((msg, index) => (
          <pre
            key={index}
            className="mb-2 p-2 bg-gradient-to-r from-blue-900/30 to-cyan-900/10 rounded border-l-4 border-blue-500 animate-pulse-slow break-words"
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              fontFamily: "inherit"
            }}
          >
            <span className="text-blue-400">⮞</span> {msg}
          </pre>
        ))}
      </div>
    </div>
  );
}
