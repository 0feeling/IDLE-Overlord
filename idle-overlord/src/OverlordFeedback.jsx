import React from "react";

export default function OverlordFeedback({ messages }) {
  return (
    <div className="bg-gray-900 p-3 rounded text-sm text-green-400 font-mono h-64 overflow-y-auto border border-gray-700">
      {messages.map((msg, index) => (
        <p key={index} className="mb-2">
          {msg}
        </p>
      ))}
    </div>
  );
}
