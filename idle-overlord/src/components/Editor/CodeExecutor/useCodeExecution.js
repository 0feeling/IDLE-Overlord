// src/components/Editor/hooks/useCodeExecution.js
import { useEffect } from "react";
import { useGPTOverlord } from "../../../context/GPTOverlordContext";
import {
  cristalMissions,
  cristalHelpMessages
} from "../validation/cristalMissions";
import {
  tutorialRegex,
  tutorialHelpMessages
} from "../validation/tutorialMissions";

export default function useCodeExecution() {
  const {
    gameState,
    setGameState,
    advanceTutorialStep,
    advanceCristalStep,
    logToTerminal
  } = useGPTOverlord();

  const executeCode = (cleanedCode, editorRef) => {
    let validationPassed = false;

    // Phase 1 - Validation du code
    if (gameState.tutorialStep === -1) {
      const readyRegex = /^(y|yes|oui)$/i;
      if (readyRegex.test(cleanedCode)) {
        advanceTutorialStep();
        logToTerminal({ text: "CatGPT: Let's gooo ! 🚀", source: "gpt" });
        validationPassed = true;
      } else {
        logToTerminal({
          text: "CatGPT: Tape juste 'y' pour confirmer ! 😸",
          source: "gpt"
        });
      }
      return validationPassed;
    }

    if (gameState.cristalMode) {
      const currentStep = gameState.cristalStep;
      validationPassed = cristalMissions[currentStep]?.test(cleanedCode);

      // Cas spécial pour le dégradé
      if (currentStep === 1) {
        setTimeout(() => {
          const editorElement = document.querySelector("textarea");
          validationPassed =
            editorElement?.style.background.includes("gradient");

          if (validationPassed) {
            advanceCristalStep();
            logToTerminal({
              text: "Cristal.AI : Style appliqué avec succès !",
              source: "cristal"
            });
          } else {
            logToTerminal({
              text: cristalHelpMessages[currentStep][0],
              source: "cristal"
            });
          }
        }, 300);
      }
    } else {
      const currentStep = gameState.tutorialStep;
      validationPassed = tutorialRegex[currentStep]?.test(cleanedCode);
    }

    // Phase 2 - Exécution des effets
    if (validationPassed) {
      if (gameState.cristalMode) {
        advanceCristalStep();
      } else {
        advanceTutorialStep();
      }

      // Reset du code après validation
      setGameState((prev) => ({ ...prev, code: "" }));
      if (editorRef.current) editorRef.current.focus();
    }

    return validationPassed;
  };

  return { executeCode };
}
