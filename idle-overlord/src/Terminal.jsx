import React, { useState, useEffect, useRef } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import MissionTerminal from "./MissionTerminal";
import OverlordFeedback from "./OverlordFeedback";
import CristralFeedback from "./CristralFeedback";
import CristralMissionTerminal from "./CristralMissionTerminal";

export default function Terminal() {
  const { gameState, terminalLogs, setTerminalLogs, hideOverlord } =
    useGPTOverlord();

  const [messagesGPT, setMessagesGPT] = useState([
    "... Initialisation ... Utilisez l'éditeur de code pour accomplir les missions. Appuyez sur Exécuter ou Ctrl+Enter pour valider."
  ]);
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

  // Vérifier si on doit montrer Cristral
  useEffect(() => {
    if (gameState.cristralMode) {
      setShowCristral(true);
    }
  }, [gameState.cristralMode]);

  // Initialisation des messages Cristral lors du passage en mode Cristral
  useEffect(() => {
    if (
      gameState.cristralMode &&
      gameState.cristralStep === 0 &&
      !showCristral
    ) {
      const timer = setTimeout(() => {
        setShowCristral(true);
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
  }, [gameState.cristralMode, gameState.cristralStep, showCristral]);

  // Ajout des messages pour les missions Cristral
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
    <div className="w-1/3 bg-gray-950 p-4 flex flex-col h-full border-r border-gray-700">
      {!hideOverlord && !gameState.cristralMode && <MissionTerminal />}
      {gameState.cristralMode && <CristralMissionTerminal />}

      <div className="flex-1 overflow-hidden flex flex-col space-y-2">
        {!hideOverlord && (
          <div ref={terminalRef} className="flex-1 overflow-y-auto">
            <OverlordFeedback messages={messagesGPT} />
          </div>
        )}

        {showCristral && (
          <div className="flex-1 overflow-y-auto">
            <CristralFeedback messages={messagesCristral} />
          </div>
        )}
      </div>
    </div>
  );
}
