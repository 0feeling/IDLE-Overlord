import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

const missionMessages = {
  0: "Instruction : Utiliser `console.log('Hello World!')` pour émettre une première sortie.",
  1: "Instruction : Créer une fonction nommée `unlockButton`.",
  2: "Instruction : Ajouter un élément cliquable de type `<button>`.",
  3: "Instruction : Définir une fonction nommée `gainInspiration()` et l’associer à l’action du bouton.",
  4: "Instruction : Créer une fonction automatique de clic. Nom suggéré : `autoClick()`.",
  5: "Instruction : Créer la fonction `unlockAutoIdea()` pour activer le mécanisme de clic automatique."
};

export default function MissionTerminal() {
  const { gameState } = useGPTOverlord();
  const step = gameState.tutorialStep;

  return (
    <div className="bg-gray-800 p-2 text-green-300 font-mono text-sm">
      <p>
        {missionMessages[step] ||
          "GPT-Overlord: Ta mission est accomplie. Pour l’instant…"}
      </p>
    </div>
  );
}
