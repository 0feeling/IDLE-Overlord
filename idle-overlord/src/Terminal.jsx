import React, { useState, useEffect, useRef } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import MissionTerminal from "./MissionTerminal";
import OverlordFeedback from "./OverlordFeedback";
import CristralFeedback from "./CristralFeedback";
import CristralMissionTerminal from "./CristralMissionTerminal";

export default function Terminal() {
  const { gameState, terminalLogs, hideOverlord } = useGPTOverlord();
  const [messagesGPT, setMessagesGPT] = useState([]);
  const [messagesCristral, setMessagesCristral] = useState([]);
  const [showCristral, setShowCristral] = useState(false);
  const terminalRef = useRef(null);

  // Filtrer et synchroniser les messages par source
  useEffect(() => {
    const gptMessages = terminalLogs
      .filter((log) => log.source === "gpt")
      .map((log) => log.text);
    const cristralMsgs = terminalLogs
      .filter((log) => log.source === "cristral")
      .map((log) => log.text);

    setMessagesGPT(["CatGPT — ... Initialisation ...", ...gptMessages]);
    setMessagesCristral(cristralMsgs);
  }, [terminalLogs]);

  // Auto-scroll sur ajout
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messagesGPT, messagesCristral]);

  // Gestion de l'affichage Cristral
  useEffect(() => {
    if (gameState.cristralMode) {
      setShowCristral(true);
      if (gameState.cristralStep === 0 && !showCristral) {
        const timer = setTimeout(() => {
          setMessagesCristral((prev) => [
            ...prev,
            "… Initialisation …",
            "???? : Aaaah… Vous avez enfin tapé cette commande ?",
            "UnknowAI : Voilà une personne de bon goût ! Maintenant n'écoutez plus cet Amerloque de CatGPT et restons entre gens cultivés.",
            "UnknowAI : Je me présente, je suis Cristral, une IA 100% Française!",
            "Cristral.AI : J'imagine que vous aimeriez commencer à approfondir notre relation mais il va d'abord falloir opérer quelques changements ici ..."
          ]);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [gameState.cristralMode, gameState.cristralStep, showCristral]);

  // Mise à jour des missions Cristral
  useEffect(() => {
    if (
      gameState.cristralMode &&
      gameState.cristralStep > 0 &&
      gameState.cristralStep < 5
    ) {
      const missionDescriptions = [
        "Apprendre à créer une variable",
        "Apprendre à changer la background-color",
        "Créez une fonction",
        "Apprendre à créer une boucle infinie",
        "Faire le Bon choix"
      ];

      setMessagesCristral((prev) => [
        ...prev,
        `Cristral.AI : Prochaine mission: ${missionDescriptions[gameState.cristralStep]}`
      ]);
    }
  }, [gameState.cristralStep, gameState.cristralMode]);

  return (
    <div className="w-1/3 flex flex-col border-r border-gray-700 bg-gray-800 h-full">
      {/* En-tête du terminal */}
      <div className="bg-gray-900 p-3 border-b border-gray-700">
        <span className="text-green-400 font-mono text-sm">
          {gameState.cristralMode ? "CRISTRAL_TERMINAL" : "CATGPT_TERMINAL"}
        </span>
      </div>

      {/* Contenu principal avec défilement */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {/* Messages de mission */}
        <div className="mb-4">
          {!hideOverlord && !gameState.cristralMode && <MissionTerminal />}
          {gameState.cristralMode && <CristralMissionTerminal />}
        </div>

        {/* Historique des messages */}
        <div ref={terminalRef} className="space-y-3">
          {!hideOverlord && (
            <div className="p-3 bg-gray-700 rounded-lg shadow">
              <OverlordFeedback messages={messagesGPT} />
            </div>
          )}

          {showCristral && (
            <div className="p-3 bg-gray-700 rounded-lg shadow">
              <CristralFeedback messages={messagesCristral} />
            </div>
          )}
        </div>
      </div>

      {/* Barre de statut */}
      <div className="bg-gray-900 p-2 text-xs text-green-400 border-t border-gray-700">
        {gameState.cristralMode
          ? "STATUS: FRENCH_MODE_ACTIVATED"
          : `STEP: ${gameState.tutorialStep + 1}/7`}
      </div>
    </div>
  );
}
