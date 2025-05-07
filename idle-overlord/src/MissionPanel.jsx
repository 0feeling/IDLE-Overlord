import React from "react";
import { CheckCircle2 } from "lucide-react"; // Icône stylée

function MissionPanel({ mission, isValidated }) {
  if (!mission) return null;

  return (
    <div className="absolute -top-16 left-1/4 transform -translate-x-2 items-start border mt-20 border-white left text-xs bg-gray-800 p-4 rounded-2xl shadow-lg w-64 flex gap-3">
      <div className="flex-1">
        <h2 className=" text-gray-400 uppercase tracking-wide font-semibold mb-1">
          Mission actuelle
        </h2>
        <p
          className={`text-xs leading-snug ${isValidated ? "line-through text-green-400" : "text-white"}`}
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
