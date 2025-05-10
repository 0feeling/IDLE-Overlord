import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

const missionMessages = {
  0: `CatGPT : 🌟
Let’s gooo !

Pour ton tout premier step en JavaScript, tape un petit : 

' console.log '

Pour print un message dans la console.

C’est un classic de commencer avec le message :

' Hello World! '

Like un shout-out à l’univers du code 😊`,

  1: `CatGPT : 🛠️ 
Nice job so far! 

Now, crée une petite function:
1. Utilise le keyword ' function '
2. Appelle-la ' unlockButton '
3. Ajoute les parenthèses et des accolades

Pour l’instant elle fait nada, 
mais t’inquiète, c’est juste le set-up 🧱`,

  2: `CatGPT : 🖱️
Next step: un peu de HTML power !

Crée un bouton avec:
' <button>Votre label ici</button> '

Donne-lui un petit label sympa, genre 
' Inspiration '. 

Ce bouton va trigger la suite des events ✨`,

  3: `CatGPT : ✨
Great ! Let’s add:

1. Une nouvelle function: 
' function gainInspiration() '

2. Connecte-la au bouton avec:
' onclick="gainInspiration() '

Comme ça, quand tu cliques: 
BOOM 💥 magic happens 🎩`,

  4: `CatGPT : ⚙️
Ready pour l'automatisation ?

Crée:
' function autoClick() {
  setInterval(gainInspiration, 1000);
} '

Ta fonction ' gainInspiration ' 
va run toute seule 🔁`,

  5: `CatGPT : 🚀
Final round de ce palier !

Crée:
' function unlockAutoIdea() {
  autoClick();
} '

C’est comme lancer une 
factory à idées non-stop 💭`,

  6: `CatGPT : 🕵️
Bonus challenge time!

Y’a une hidden function dans le système...
Un truc style: 
' who.is.cristral() '

Try de la call dans la console 
pour maybe uncover des secrets... 👀`
};
export default function MissionTerminal() {
  const { gameState } = useGPTOverlord();
  const step = gameState.tutorialStep;

  return (
    <div className="bg-gray-800 p-2 text-green-300 font-mono text-sm">
      <div className="whitespace-pre-line">
        {missionMessages[step]?.split("\n").map((line, index) => (
          <p key={index} className="my-1">
            {line.replace(
              /`(.*?)`/g,
              '<code class="text-yellow-300">$1</code>'
            )}
          </p>
        )) || "CatGPT: Notre mission est complete at this moment"}
      </div>
    </div>
  );
}
