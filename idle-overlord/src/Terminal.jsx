import React, { useState, useEffect, useRef } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";
import MissionTerminal from "./MissionTerminal";
import OverlordFeedback from "./OverlordFeedback";
import CristalFeedback from "./CristalFeedback";
import CristalMissionTerminal from "./CristalMissionTerminal";

export default function Terminal() {
  const { gameState, terminalLogs, hideOverlord } = useGPTOverlord();
  const [messagesGPT, setMessagesGPT] = useState([]);
  const [messagesCristal, setMessagesCristal] = useState([]);
  const [showCristal, setShowCristal] = useState(false);
  const terminalRef = useRef(null);

  // Filtrer et synchroniser les messages par source
  useEffect(() => {
    const gptMessages = terminalLogs
      .filter((log) => log.source === "gpt")
      .map((log) => log.text);
    const cristalMsgs = terminalLogs
      .filter((log) => log.source === "cristal")
      .map((log) => log.text);

    setMessagesGPT(gptMessages);
    setMessagesCristal(cristalMsgs);
  }, [terminalLogs]);

  // Auto-scroll sur ajout
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messagesGPT, messagesCristal]);

  // Gestion de l'affichage Cristal
  useEffect(() => {
    if (gameState.cristalMode) {
      setShowCristal(true);
      if (gameState.cristalStep === 0 && !showCristal) {
        const timer = setTimeout(() => {
          setMessagesCristal((prev) => [
            ...prev,
            "… Initialisation …",
            "???? : Aaaah… Vous avez enfin tapé cette commande ?",
            "UnknowAI : Voilà une personne de bon goût ! Maintenant n'écoutez plus cet Amerloque de CatGPT et restons entre gens cultivés.",
            "UnknowAI : Je me présente, je suis Cristal, une IA 100% Française!",
            "Cristal.AI : J'imagine que vous aimeriez commencer à approfondir notre relation mais il va d'abord falloir opérer quelques changements esthétiques ici ..."
          ]);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [gameState.cristalMode, gameState.cristalStep, showCristal]);

  // Mise à jour des missions Cristal; laisser en commentaire à utiliser plus tard pour décrire une mission avant le help message
  // useEffect(() => {
  //   if (
  //     gameState.cristalMode &&
  //     gameState.cristalStep > 0 &&
  //     gameState.cristalStep < 5
  //   ) {
  //     const missionDescriptions = [
  //       `Apprendre à créer une variable en Appliquant dans la console la commande : ' let freedom = true ' `,
  //       `Pour modifier la couleur de fond de l’éditeur :

  //       1. Sélectionner l’élément de la page dont le nom est "editor" :
  //       ' document.querySelector('editor') '

  //       2. Modifier le style (CSS) de la page et cibler la couleur de fond grâce à :
  //       ' .style.background = '

  //       3. Appliquer un dégradé horizontal avec :
  //       ' linear-gradient(to right, #0055A4, #FFFFFF, #EF4135) '

  //       Les éléments avec un # et entre parenthèses correspondent à des couleurs différentes en format héxadecimal:
  //       ' #0055A4, #FFFFFF, #EF4135 '`,
  //       `Créez une fonction 'deconditionner'`,
  //       "Apprendre à créer une boucle infinie",
  //       "Faire le Bon choix"
  //     ];

  //     setMessagesCristal((prev) => [
  //       ...prev,
  //       `Cristal.AI : Prochaine mission: ${missionDescriptions[gameState.cristalStep]}`
  //     ]);
  //   }
  // }, [gameState.cristalStep, gameState.cristalMode]);

  return (
    <div className="w-1/3 flex flex-col bg-gray-900 h-full border-r border-gray-800">
      {/* En-tête du terminal */}
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <span
          className={`font-mono text-sm tracking-wide ${
            gameState.cristalMode ? "text-blue-400" : "text-green-400"
          }`}
        >
          {gameState.cristalMode ? "CRISTAL_TERMINAL" : "CATGPT_TERMINAL"}
        </span>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Messages de mission */}
        <div>
          {!hideOverlord && !gameState.cristalMode && <MissionTerminal />}
          {gameState.cristalMode && <CristalMissionTerminal />}
        </div>

        {/* Historique des messages */}
        <div
          ref={terminalRef}
          className="resize-y overflow-auto bg-gray-800 rounded-lg border border-gray-700 p-3 space-y-3 min-h-32 max-h-96 shadow-inner"
        >
          {!hideOverlord && (
            <div className="bg-gray-700 rounded-md p-2">
              <OverlordFeedback messages={messagesGPT} />
            </div>
          )}

          {showCristal && (
            <div className="bg-gray-700 rounded-md p-2">
              <CristalFeedback messages={messagesCristal} />
            </div>
          )}
        </div>
      </div>

      {/* Barre de statut */}
      <div
        className={`bg-gray-800 px-4 py-2 text-xs font-mono border-t border-gray-700 ${
          gameState.cristalMode ? "text-blue-400" : "text-green-400"
        }`}
      >
        {gameState.cristalMode
          ? "STEP: FRENCH_MODE_ACTIVATED"
          : `STEP: ${gameState.tutorialStep + 1}/7`}
      </div>
    </div>
  );
}
