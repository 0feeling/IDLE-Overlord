import React from "react";

export default function OverlordFeedback({ messages }) {
  return (
    <div className="bg-gray-900 p-3 rounded text-sm text-green-400 font-mono h-64 overflow-y-auto border border-gray-700">
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
