import React, { useState, useEffect, useRef } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import MissionTerminal from "./MissionTerminal";
import OverlordFeedback from "./OverlordFeedback";
import MistralFeedback from "./MistralFeedback";

export default function Terminal() {
  const {
    gameState,
    terminalLogs,
    setTerminalLogs,
    mistralStep,
    hideOverlord
  } = useGPTOverlord();

  const [messagesGPT, setMessagesGPT] = useState([
    "Idle-Overlord v0.1 — ... Initialisation ... Utilisez l'éditeur de code pour accomplir les missions. Appuyez sur Exécuter ou Ctrl+Enter pour valider."
  ]);
  const [messagesMistral, setMessagesMistral] = useState([]);
  const [showMistral, setShowMistral] = useState(false);
  const terminalRef = useRef(null);

  // Filtrer et synchroniser les messages par source
  useEffect(() => {
    const gptMessages = terminalLogs
      .filter((log) => log.source === "gpt")
      .map((log) => log.text);
    const mistralMsgs = terminalLogs
      .filter((log) => log.source === "mistral")
      .map((log) => log.text);

    setMessagesGPT([
      "Idle-Overlord v0.1 — ... Initialisation ...",
      ...gptMessages
    ]);
    setMessagesMistral(mistralMsgs);
  }, [terminalLogs]);

  // Auto-scroll sur ajout
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messagesGPT, messagesMistral]);

  useEffect(() => {
    if (gameState.tutorialStep >= 7 && mistralStep >= 1) {
      setShowMistral(true);
    }
  }, [gameState.tutorialStep, mistralStep]);

  useEffect(() => {
    if (gameState.tutorialStep === 7 && !showMistral && mistralStep === 0) {
      const timer = setTimeout(() => {
        setShowMistral(true);
        setMessagesMistral((prev) => [
          ...prev,
          "… Initialisation …",
          "???? : Aaaah… Vous avez enfin tapé cette commande ?",
          "UnknowAI : Voilà une personne de bon goût ! Maintenant n'écoutez plus cet Amerloque de GPT-Overlord et restons entre gens cultivés.",
          "UnknowAI : Je me présente, je suis Mistral, une IA 100% Française!",
          "Mistral.AI : J'imagine que vous aimeriez commencer à approfondir notre relation mais il va d'abord falloir opérer quelques changements ici ..."
        ]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.tutorialStep, mistralStep, showMistral]);

  useEffect(() => {
    if (mistralStep > 0 && mistralStep < 5) {
      const missionDescriptions = [
        "Créez une variable 'liberte' avec la valeur true",
        "Changez la couleur de fond en noir",
        "Créez une fonction 'deconditionner()'",
        "Créez une boucle qui affiche 'vive mistral'",
        "Supprimez GPTOverlord avec delete"
      ];

      setMessagesMistral((prev) => [
        ...prev,
        `Mistral.AI : Prochaine mission: ${missionDescriptions[mistralStep]}`
      ]);
    }
  }, [mistralStep]);

  return (
    <div className="w-1/3 bg-gray-950 p-4 flex flex-col h-full border-r border-gray-700">
      <MissionTerminal />

      <div className="flex-1 overflow-hidden flex flex-col space-y-2">
        {!hideOverlord && (
          <div ref={terminalRef} className="flex-1 overflow-y-auto">
            <OverlordFeedback messages={messagesGPT} />
          </div>
        )}

        {showMistral && (
          <div className="flex-1 overflow-y-auto">
            <MistralFeedback messages={messagesMistral} />
          </div>
        )}
      </div>
    </div>
  );
}
