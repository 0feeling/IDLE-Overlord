import React, { useEffect, useState } from "react";

function OverlayMessage({ gameState }) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (gameState.autoIdeaUnlocked) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000); // Disparaît après 3 secondes

      return () => clearTimeout(timer);
    }
  }, [gameState.autoIdeaUnlocked]);

  if (!showMessage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl p-4 z-50">
      <div className="bg-gray-900 p-6 rounded-md shadow-lg">
        <h2 className="font-bold mb-2">GPT-Overlord</h2>
        <p>
          Félicitations ! Tu as débloqué le 🧠 GPT Auto-idée 🧠 L'inspiration te
          vient toute seule{" "}
        </p>
      </div>
    </div>
  );
}

export default OverlayMessage;
