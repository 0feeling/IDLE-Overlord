import React from "react";

export default function OverlordFeedback({ messages }) {
  return (
    <div className="text-green-300 font-mono text-sm space-y-3">
      {/* En-tête interne du bloc feedback */}
      <div className="bg-gray-800 px-3 py-2 rounded-md border border-gray-700 shadow-sm">
        <span className="text-green-400 font-semibold tracking-wide">
          🐾 CatGPT — Helper
        </span>
      </div>

      {/* Zone de messages */}
      <div className="overflow-y-auto max-h-[50vh] pr-1 space-y-2">
        {messages.map((msg, index) => (
          <pre
            key={index}
            className="bg-gray-900 p-3 rounded-md border border-gray-700 text-green-200 break-words whitespace-pre-wrap"
          >
            {msg.split("\n").map((line, lineIndex) => (
              <div key={lineIndex} className="flex items-start">
                {lineIndex === 0 ? (
                  <span className="text-green-400 mr-2">➜</span>
                ) : (
                  <span className="w-4" />
                )}
                <span className="flex-1">{line}</span>
              </div>
            ))}
          </pre>
        ))}
      </div>
    </div>
  );
}
