import React, { useState, useEffect } from "react";
import { useGPTOverlord } from "./GPTOverlordContext";

function FirstGenerators() {
  const { gameState, advanceTutorialStep, setGameState } = useGPTOverlord();
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [copiedCount, setCopiedCount] = useState(0);
  const [timeoutDetected, setTimeoutDetected] = useState(false);
  const [recursiveDetected, setRecursiveDetected] = useState(false);
  const [loopDetected, setLoopDetected] = useState(false);

  useEffect(() => {
    switch (step) {
      case 0:
        setMessages([
          "GPT-Overlord: Commence avec un bon vieux copier-coller.",
          "GPT-Overlord: Essaie de copier cette ligne trois fois :",
          "console.log('Inspiration !');"
        ]);
        break;
      case 1:
        setMessages([
          "GPT-Overlord: Ou alors, une petite astuce avec des `setTimeout` ! C’est plus raffiné.",
          "GPT-Overlord: Teste ça et observe le résultat..."
        ]);
        break;
      case 2:
        setMessages([
          "GPT-Overlord: Ça n'a pas assez de style, non ? Et si on faisait une fonction qui s'appelle elle-même ?",
          "GPT-Overlord: C'est déjà du génie, n'est-ce pas ?"
        ]);
        break;
      case 3:
        setMessages([
          "GPT-Overlord: Essayons d’imiter une boucle avec un compteur.",
          "GPT-Overlord: Ce sera encore plus rigide mais plus efficace.",
          "Quand tu auras réussi, je t’accorderai l’accès à **une véritable Génération Automatique**."
        ]);
        break;
      case 4:
        setMessages([
          "GPT-Overlord: Bravo. Tu as franchi une étape décisive.",
          "GPT-Overlord: Tu es prêt à générer... **sans fin**.",
          "Auto-generator débloqué. 🎉"
        ]);
        setTimeout(() => {
          advanceTutorialStep();
        }, 2000);
        break;
      default:
        break;
    }
  }, [step]);

  // Détection de la progression dans le code tapé
  useEffect(() => {
    const code = gameState.code || "";

    // Étape 0 : 3 fois la même ligne
    const occurrences = (
      code.match(/console\.log\(['"]Inspiration !['"]\)[;\s]?/g) || []
    ).length;
    if (step === 0 && occurrences >= 3) {
      setStep(1);
    }

    // Étape 1 : présence de setTimeout
    if (step === 1 && code.includes("setTimeout")) {
      setTimeoutDetected(true);
      setStep(2);
    }

    // Étape 2 : détection récursivité
    const recursiveFunction = /function\s+\w+\(\)\s*{[^}]*\1\(\)/s;
    const simplerRecursive = /function\s+\w+\s*\(\)\s*{[^}]*\b\w+\s*\(\)/s;
    if (step === 2 && simplerRecursive.test(code)) {
      setRecursiveDetected(true);
      setStep(3);
    }

    // Étape 3 : détection boucle + compteur
    if (
      step === 3 &&
      (code.includes("for (") || code.includes("while (")) &&
      code.includes("let") &&
      code.includes("<") &&
      code.includes("++")
    ) {
      setLoopDetected(true);
      setStep(4);
    }
  }, [gameState.code, step]);

  return (
    <div className="bg-gray-900 text-white p-4 mt-4 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Quête : Générateurs</h3>
      {messages.map((msg, index) => (
        <p key={index} className="mb-1">
          {msg}
        </p>
      ))}
    </div>
  );
}

export default FirstGenerators;
