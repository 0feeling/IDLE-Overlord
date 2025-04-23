import React from "react";
import { CheckCircle2 } from "lucide-react"; // Icône stylée

function MissionPanel({ mission, isValidated }) {
  return (
    <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 p-4 rounded-2xl shadow-lg w-64 flex items-start gap-3">
      <div className="flex-1">
        <h2 className="text-sm text-gray-400 uppercase tracking-wide font-semibold mb-1">
          Mission actuelle
        </h2>
        <p
          className={`text-base leading-snug ${isValidated ? "line-through text-green-400" : "text-white"}`}
        >
          {mission}
        </p>
      </div>

      {isValidated && (
        <CheckCircle2
          className="text-green-400 shrink-0 animate-bounce"
          size={24}
        />
      )}
    </div>
  );
}

export default MissionPanel;
