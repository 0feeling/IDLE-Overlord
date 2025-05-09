import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

const missionMessages = {
  0: "CatGPT : 🌟 C’est parti ! Pour ton tout premier pas en JavaScript, essaye d’afficher un message dans la console. On utilise `console.log` pour ça, avec le texte entre guillemets simples. C’est une tradition que de commencer par `Hello World!` — comme dire bonjour à l’univers du code 😊",

  1: "CatGPT : 🛠️ Très bien ! Maintenant, écris une fonction toute simple. Pour ça, tu vas utiliser le mot-clé `function`, suivi du nom `unlockButton` avec des parenthèses, puis des accolades. Elle ne fera rien encore, mais c’est une base solide à poser 🧱",

  2: "CatGPT : 🖱️ On passe au HTML ! Crée un bouton avec la balise `<button>`. Tu peux lui donner un petit texte doux, comme 'Inspiration'. Ce bouton nous servira pour déclencher la suite des événements ✨",

  3: "CatGPT : ✨ Super ! Crée maintenant une nouvelle fonction, que tu peux appeler `gainInspiration()` par exemple. Et surtout, relie cette fonction à ton bouton avec un `onclick`. Comme ça, quand on clique, la magie opère ! 🎩",

  4: "CatGPT : ⚙️ Tu es prêt·e pour un peu d’automatisation ? Crée une fonction appelée `autoClick()`, et utilise `setInterval()` dedans pour que ta fonction `gainInspiration` se lance automatiquement à intervalles réguliers. Comme un petit moteur qui tourne tout seul 🔁",

  5: "CatGPT : 🚀 On conclut ce palier ! Crée une dernière fonction appelée `unlockAutoIdea()` qui appelle `autoClick()` quand elle est lancée. C’est un peu comme activer une machine à produire des idées sans interruption ! 💭",

  6: "CatGPT : 🕵️ Petit défi bonus ! Il existe une fonction cachée dans le système… Peut-être un truc comme `who.is.cristral()` ? Essaie de l'appeler depuis la console pour en savoir plus... 👀"
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
