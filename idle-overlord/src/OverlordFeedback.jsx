import React from "react";

export default function OverlordFeedback({ messages }) {
  return (
    <div className="text-green-300 font-mono text-sm space-y-2">
      <div className="bg-gray-900 p-2 rounded-t border-b border-gray-700">
        <span className="text-green-400">🐾 CatGPT — Terminal</span>
      </div>

      <div className="overflow-y-auto max-h-[50vh] pr-2">
        {messages.map((msg, index) => (
          <pre
            key={index}
            className="mb-2 p-2 bg-gray-800 rounded border-l-4 border-green-600 break-words"
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              fontFamily: "inherit"
            }}
          >
            <span className="text-green-400">➜</span> {msg}
          </pre>
        ))}
      </div>
    </div>
  );
}
