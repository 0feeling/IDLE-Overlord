import React from "react";

export default function OverlordFeedback({ messages }) {
  return (
    <div className="bg-black p-2 text-white font-mono text-xs space-y-1">
      {messages.map((msg, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {msg}
        </div>
      ))}
    </div>
  );
}
