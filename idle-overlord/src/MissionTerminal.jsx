import React from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

const missionMessages = {
  // Étape -1 : Message de bienvenue initial
  "-1": ` — Loading of CatGPT —
  
  ...Initialisation en douceur...
  
  CatGPT: 🌟 

  Hello, my friend ! Je suis CatGPT 🐾 !
  
  Ton compagnon d'aventure numérique!
  
  Je serais là pour t'aider à chaque step,
  te guider pas à pas et encourager ta créativity ✨
   
  Don't be afraid : Follow les instructions, fais de ton mieux et surtout... 
  fais-toi confiance ! 
  Et si tu block ? Je serai always là ! 
  Ready à t'épauler 💛
  
  Are you ready ? 
  Tape 'y', 'yes' ou 'oui' dans l'Editor 
  pour commencer l'adventure ! 💻🚀`,

  0: `CatGPT : 🔥
Let’s gooo !

Pour ta toute 1st step de code, tape un little : 

' console.log() '

Pour print un message dans la console.

C’est un classic de commencer with le message :

' 'Hello World!' '

Like un shout-out à l’univers du code 😊`,

  1: `CatGPT : 🛠️ 
Nice job so far! 

Now, crée une little function:

1. Use le keyword ' function '
2. Call it ' unlockButton '
3. Add des parenthèses() et des accolades{}

For now, elle fait nothing, 
but don't worry, c’est just le début! 🧱`,

  2: `CatGPT : 🖱️
Next step: un peu de HTML power !

Crée un bouton avec:

' <button>Votre label ici</button> '

Donne-lui un little label sympa, like: 
' Inspiration '. 

Ce button va trigger la suite des events ✨`,

  3: `CatGPT : ✨
Great ! Let’s add:

1. Une nouvelle function:

' function gainInspiration() '

2. Connecte-la au bouton avec:

' onclick=gainInspiration() '

Comme ça, quand tu cliques: 
And BOOM 💥 magic happens 🎩`,

  4: `CatGPT : ⚙️
Ready pour l'automatisation ?

Create:

' function autoClick() {
  setInterval(gainInspiration, 1000);
} '

Ta function: 

' gainInspiration ' 

va run toute seule 🔁`,

  5: `CatGPT : 🚀
Final round de ce palier !

Create:

' function unlockAutoIdea() {
  autoClick(); } '

C’est comme lancer une 
factory à idées non-stop 💭`,

  6: `CatGPT : 🕵️
A la recherche d'une nouvelle task pour toi, j'ai trouvé une hidden function dans les files du system...
ça dit que si tu parles French tu devrais write:

' who.is.cristal() '

Try it! may be it's a cool featuring! 

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
