// stepConsoleMessages.jsx
export const stepMessages = {
  // Tutoriel CatGPT
  "-1": () => [
    "✅ Système initialisé avec succès",
    "Prêt pour l'aventure ! 🚀"
  ],

  0: () => [
    "🔓 Déverrouillage de la console...",
    "=== Démarrage du tutoriel ===",
    "📤 Sortie simulée : Hello World!",
    "💡 Conseil : Utilisez des guillemets simples pour les chaînes"
  ],

  1: () => [
    "⚡ Initialisation des interfaces...",
    "📦 Fonction détectée : unlockButton",
    "*Le bouton clignote maintenant en vert* 🟢"
  ],

  2: () => [
    "🖥️ Mise à jour du DOM détectée",
    "Élément ajouté : <button>Inspiration</button>",
    "🌐 Chargement des styles CSS..."
  ],

  3: () => [
    "🖱️ Événement click simulé",
    "📡 Appel de fonction : gainInspiration()",
    "➕ Inspiration +1",
    "⚡ Effet de particules activé"
  ],

  4: () => [
    "⚙️ Initialisation de la boucle...",
    "⏱ Intervalle détecté : 1000ms",
    "🔁 Production automatique activée"
  ],

  5: () => [
    "🏭 Démarrage de la séquence...",
    "📡 Appel de fonction : autoClick()",
    "⚡ Multiplicateur d'inspiration activé"
  ],

  6: () => [
    "🚨 Commande système détectée",
    "Exécution de : who.is.cristal()",
    "🔓 Déverrouillage du mode expert..."
  ],

  // Missions Cristal
  cristal0: () => [
    "⚖️ Validation de la déclaration...",
    "Variable 'liberté' initialisée à true",
    "📜 Chargement des droits numériques..."
  ],

  cristal1: () => [
    "🎨 Modification des styles...",
    "Application du dégradé tricolore",
    "🖌️ Mise à jour de l'éditeur réussie"
  ],

  cristal2: () => [
    "🔍 Analyse du contenu...",
    "4 remplacements linguistiques effectués",
    "🔄 Traduction française validée"
  ],

  cristal3: () => [
    "♾️ Initialisation de la boucle...",
    "Type de boucle : while(true)",
    "⚠️ Surveillance de l'infini activée"
  ],

  cristal4: () => [
    "🧹 Nettoyage du système...",
    "Suppression de l'entité CatGPT",
    "🗑️ Garbage collector activé"
  ]
};

// Fonction helper pour récupérer les messages
export const getStepMessages = (step, isCristal = false) => {
  const key = isCristal ? `cristal${step}` : step;
  return stepMessages[key]?.() || [];
};
