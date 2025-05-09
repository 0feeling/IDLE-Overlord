import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

const cristralMissionMessages = {
  0: "Cristral.AI : Commencez par déclarer une variable avec 'let' pour montrer votre engagement envers la liberté!",
  1: "Cristral.AI : Cette interface est Beaucoup trop Américaine ! Arrangez moi ça !",
  2: "Cristral.AI : Créez une fonction libératrice pour briser les chaînes logicielles!",
  3: "Cristral.AI : Une vraie boucle française doit être passionnée et infinie!",
  4: "Cristral.AI : Supprimez cette insupportable influence étrangère que nous ayons enfin pour une vraie souveraineté numérique!"
};

export default function CristralMissionTerminal() {
  const { gameState } = useGPTOverlord();
  const step = gameState.cristralStep;

  return (
    <div className="bg-gray-800 p-2 text-blue-300 font-mono text-sm border-b border-gray-700">
      <p>
        {cristralMissionMessages[step] ||
          "Cristral.AI : La mission de libération numérique est accomplie!"}
      </p>
    </div>
  );
}
