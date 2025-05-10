import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

const cristalMissionMessages = {
  0: "Cristal.AI : Commencez par déclarer une variable avec 'let' pour montrer votre engagement envers la liberté!",
  1: "Cristal.AI : Cette interface est Beaucoup trop Américaine ! Arrangez moi ça !",
  2: "Cristal.AI : Créez une fonction libératrice pour briser les chaînes logicielles!",
  3: "Cristal.AI : Une vraie boucle française doit être passionnée et infinie!",
  4: "Cristal.AI : Supprimez cette insupportable influence étrangère que nous ayons enfin pour une vraie souveraineté numérique!"
};

export default function CristalMissionTerminal() {
  const { gameState } = useGPTOverlord();
  const step = gameState.cristalStep;

  return (
    <div className="bg-gray-800 p-2 text-blue-300 font-mono text-sm border-b border-gray-700">
      <p>
        {cristalMissionMessages[step] ||
          "Cristal.AI : La mission de libération numérique est accomplie!"}
      </p>
    </div>
  );
}
