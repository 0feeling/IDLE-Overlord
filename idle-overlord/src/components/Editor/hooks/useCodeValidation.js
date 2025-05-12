// src/components/Editor/hooks/useCodeValidation.js
import { useGPTOverlord } from "../../../GPTOverlordContext";
import {
  cristalMissions,
  cristalHelpMessages
} from "../validation/cristalMissions";
import {
  tutorialRegex,
  tutorialHelpMessages
} from "../validation/tutorialMissions";

export default function useCodeValidation() {
  const {
    gameState,
    setGameState,
    advanceTutorialStep,
    advanceCristalStep,
    logToTerminal
  } = useGPTOverlord();

  const validateCode = (cleanedCode, editorRef) => {
    if (gameState.tutorialStep === -1) {
      const readyRegex = /^(y|yes|oui)$/i;
      if (readyRegex.test(cleanedCode)) {
        advanceTutorialStep();
        logToTerminal({ text: "CatGPT: Let's gooo ! 🚀", source: "gpt" });
        return true;
      }
      logToTerminal({
        text: "CatGPT: Tape juste 'y' pour confirmer ! 😸",
        source: "gpt"
      });
      return false;
    }

    if (gameState.cristalMode) {
      const currentStep = gameState.cristalStep;
      const missionValid = cristalMissions[currentStep]?.test(cleanedCode);

      if (currentStep === 1) {
        setTimeout(() => {
          const editorElement = document.querySelector("textarea");
          const hasGradient =
            editorElement?.style.background.includes("gradient");

          if (hasGradient) {
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
        return hasGradient;
      }

      if (missionValid) {
        advanceCristalStep();
        logToTerminal({
          text: "Cristal.AI : Validation réussite !",
          source: "cristal"
        });
        return true;
      }

      logToTerminal({
        text: cristalHelpMessages[currentStep][0] || "Code incorrect",
        source: "cristal"
      });
      return false;
    }

    const currentStep = gameState.tutorialStep;
    const stepValid = tutorialRegex[currentStep]?.test(cleanedCode);

    if (stepValid) {
      advanceTutorialStep();
      logToTerminal({
        text: tutorialHelpMessages[currentStep][1] || "Code validé !",
        source: "gpt"
      });
      return true;
    }

    logToTerminal({
      text: `CatGPT: Presque ! Essaye ça :\n${tutorialHelpMessages[currentStep][0]}`,
      source: "gpt"
    });
    return false;
  };

  return { validateCode };
}
