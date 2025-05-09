import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

const missionMessages = {
  0: "CatGPT : 🌟 Let’s gooo ! Pour ton tout premier step en JavaScript, tape un petit `console.log` pour print un message dans la console. C’est un classic de commencer avec `Hello World!` — comme un shout-out à l’univers du code 😊",

  1: "CatGPT : 🛠️ Nice job so far! Now, crée une petite function. Utilise le keyword `function`, appelle-la `unlockButton`, ajoute les parenthèses et des accolades. Pour l’instant elle fait nada, mais t’inquiète, c’est juste le set-up 🧱",

  2: "CatGPT : 🖱️ Next step: un peu de HTML power ! Crée un bouton avec la balise `<button>`. Donne-lui un petit label sympa, genre 'Inspiration'. Ce bouton va trigger la suite des events ✨",

  3: "CatGPT : ✨ Great ! Let’s add une nouvelle function — genre `gainInspiration()`. Et surtout, connecte-la à ton bouton avec `onclick`. Comme ça, quand tu cliques, boom: magic happens 🎩",

  4: "CatGPT : ⚙️ Ready pour un peu d’automatisation ? Create une function `autoClick()` avec `setInterval()` dedans. Comme ça, ta fonction `gainInspiration` va run toute seule again and again. C’est le auto-mode 🔁",

  5: "CatGPT : 🚀 Final round de ce palier ! Crée une dernière function: `unlockAutoIdea()`. Elle call `autoClick()` direct. C’est comme lancer une factory à idées non-stop 💭",

  6: "CatGPT : 🕵️ Bonus challenge time! Y’a une hidden function dans le système... Un truc style `who.is.cristral()` ? Try de la call dans la console pour maybe uncover des secrets... 👀"
};

export default function MissionTerminal() {
  const { gameState } = useGPTOverlord();
  const step = gameState.tutorialStep;

  return (
    <div className="bg-gray-800 p-2 text-green-300 font-mono text-sm">
      <p>
        {missionMessages[step] ||
          "CatGPT: Ta mission est accomplie. Pour l’instant…"}
      </p>
    </div>
  );
}
