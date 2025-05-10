import React, { useEffect, useState } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

function OverlayMessage() {
  const { gameState } = useGPTOverlord();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showAutoMessage, setShowAutoMessage] = useState(false);

  // Combine les états pour gérer le fond noir
  const shouldShowOverlay = showWelcomeMessage || showAutoMessage;

  useEffect(() => {
    let autoTimeout;
    if (gameState.autoIdeaUnlocked) {
      setShowAutoMessage(true);
      autoTimeout = setTimeout(() => setShowAutoMessage(false), 3000);
    }
    return () => clearTimeout(autoTimeout);
  }, [gameState.autoIdeaUnlocked]);

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 10000);

    return () => clearTimeout(welcomeTimeout);
  }, []);

  useEffect(() => {
    if (gameState.tutorialStep > 0) {
      setShowWelcomeMessage(false);
    }
  }, [gameState.tutorialStep]);

  if (!shouldShowOverlay) return null; // Ne rend rien si aucun message

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 pointer-events-none">
      {showWelcomeMessage && (
        <div className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 p-8 rounded-xl max-w-2xl text-center border-2 border-white/10 backdrop-blur-sm animate-fade-in">
          <div className="space-y-4 text-white/90">
            <h2 className="text-3xl font-bold mb-6 tracking-wider">
              ~ Bienvenue dans GPT-Aventure ~
            </h2>

            <div className="text-lg space-y-4">
              <p className="animate-bounce">✨🚀✨</p>

              <p className="italic opacity-90">
                "Salut ! Moi c'est Tim, le créateur de ce jeu."
              </p>

              <p className="text-sm leading-relaxed">
                Je tenais à te souhaiter la bienvenue personnellement avant que
                tu ne rencontres ton premier compagnon de voyage.
                <br />
                Tu t'apprêtes à vivre une expérience unique où{" "}
                <span className="text-yellow-400">logique</span>,{" "}
                <span className="text-pink-400">créativité</span> et{" "}
                <span className="text-green-400">découverte</span> ne feront
                qu'un !
              </p>

              <div className="my-4 border-t border-white/20 pt-4">
                <p className="font-semibold mb-2">
                  Quelques tips pour bien démarrer :
                </p>
                <ul className="text-xs space-y-1 opacity-80">
                  <li>• Explore chaque option avec curiosité</li>
                  <li>
                    • Les erreurs font partie de la progression et, ne
                    t'inquiète pas, elles débloqueront des messages pour t'aider
                  </li>
                  <li>• Amuse-toi avant tout !</li>
                </ul>
              </div>

              <p className="text-xl mt-6 animate-pulse">Bon jeu !</p>
            </div>
          </div>
        </div>
      )}

      {showAutoMessage && (
        <div className="bg-gray-800 p-6 rounded-md max-w-2xl text-blue-300 font-mono animate-pulse-slow">
          <h2 className="text-xl mb-4">⚡ Auto-Générateur débloqué !</h2>
          <p>La production passive est maintenant activée !</p>
        </div>
      )}
    </div>
  );
}

export default OverlayMessage;
