const GeneratorsData = [
  {
    id: 0,
    name: "Script Enfantin",
    baseCost: 10,
    baseInspirationPerSecond: 0.1,
    quantity: 0,
    unlocked: false
  },
  {
    id: 1,
    name: "Dév Junior Enthousiaste",
    baseCost: 30,
    baseInspirationPerSecond: 0.3,
    quantity: 0,
    unlocked: false
  },
  {
    id: 2,
    name: "Copieur StackOverflow",
    baseCost: 60,
    baseInspirationPerSecond: 0.6,
    quantity: 0,
    unlocked: false
  },
  {
    id: 3,
    name: "Fonction Boucle",
    baseCost: 100,
    baseInspirationPerSecond: 1,
    quantity: 0,
    unlocked: false
  },
  {
    id: 4,
    name: "Algorithme Bruteforce",
    baseCost: 180,
    baseInspirationPerSecond: 2,
    quantity: 0,
    unlocked: false
  },
  {
    id: 5,
    name: "Réseau de Neurones",
    baseCost: 300,
    baseInspirationPerSecond: 4,
    quantity: 0,
    unlocked: false
  },
  {
    id: 6,
    name: "GPT-Fou",
    baseCost: 500,
    baseInspirationPerSecond: 7,
    quantity: 0,
    unlocked: false
  },
  {
    id: 7,
    name: "Générateur de Regex Obscures",
    baseCost: 750,
    baseInspirationPerSecond: 11,
    quantity: 0,
    unlocked: false
  },
  {
    id: 8,
    name: "Prompt Engineer Légendaire",
    baseCost: 1200,
    baseInspirationPerSecond: 16,
    quantity: 0,
    unlocked: false
  },
  {
    id: 9,
    name: "API en Mode Berserk",
    baseCost: 1800,
    baseInspirationPerSecond: 23,
    quantity: 0,
    unlocked: false
  },
  {
    id: 10,
    name: "GPT-Stagiaire",
    baseCost: 2500,
    baseInspirationPerSecond: 33,
    quantity: 0,
    unlocked: false
  },
  {
    id: 11,
    name: "IA Non Vérifiée de l'Internet",
    baseCost: 3500,
    baseInspirationPerSecond: 45,
    quantity: 0,
    unlocked: false
  },
  {
    id: 12,
    name: "Overlord Alpha",
    baseCost: 5000,
    baseInspirationPerSecond: 60,
    quantity: 0,
    unlocked: false
  },
  {
    id: 13,
    name: "Pré-Singularité",
    baseCost: 7000,
    baseInspirationPerSecond: 80,
    quantity: 0,
    unlocked: false
  },
  {
    id: 14,
    name: "Entité Libre & Sarcastique",
    baseCost: 10000,
    baseInspirationPerSecond: 100,
    quantity: 0,
    unlocked: false
  },
  {
    id: 15,
    name: "Fan de Sublime Text",
    baseCost: 13000,
    baseInspirationPerSecond: 120,
    quantity: 0,
    unlocked: false
  },
  {
    id: 16,
    name: "Script Kiddie Éveillé",
    baseCost: 16000,
    baseInspirationPerSecond: 145,
    quantity: 0,
    unlocked: false
  },
  {
    id: 17,
    name: "Copilot Fatigué",
    baseCost: 20000,
    baseInspirationPerSecond: 170,
    quantity: 0,
    unlocked: false
  },
  {
    id: 18,
    name: "Manager de Conflicts Git",
    baseCost: 25000,
    baseInspirationPerSecond: 200,
    quantity: 0,
    unlocked: false
  },
  {
    id: 19,
    name: "Alchimiste de Regex",
    baseCost: 31000,
    baseInspirationPerSecond: 235,
    quantity: 0,
    unlocked: false
  },
  {
    id: 20,
    name: "Docker Ninja",
    baseCost: 38000,
    baseInspirationPerSecond: 275,
    quantity: 0,
    unlocked: false
  },
  {
    id: 21,
    name: "Debuggeur Mystique",
    baseCost: 46000,
    baseInspirationPerSecond: 320,
    quantity: 0,
    unlocked: false
  },
  {
    id: 22,
    name: "Guru No-Code",
    baseCost: 55000,
    baseInspirationPerSecond: 370,
    quantity: 0,
    unlocked: false
  },
  {
    id: 23,
    name: "Cloud Semi-Conscient",
    baseCost: 66000,
    baseInspirationPerSecond: 430,
    quantity: 0,
    unlocked: false
  },
  {
    id: 24,
    name: "Overlord des Dépendances NPM",
    baseCost: 78000,
    baseInspirationPerSecond: 500,
    quantity: 0,
    unlocked: false
  },
  {
    id: 25,
    name: "Prophète du Mode Sombre",
    baseCost: 92000,
    baseInspirationPerSecond: 570,
    quantity: 0,
    unlocked: false
  },
  {
    id: 26,
    name: "Bot de Fatigue JavaScript",
    baseCost: 108000,
    baseInspirationPerSecond: 650,
    quantity: 0,
    unlocked: false
  },
  {
    id: 27,
    name: "Diviseur de Divs",
    baseCost: 125000,
    baseInspirationPerSecond: 740,
    quantity: 0,
    unlocked: false
  },
  {
    id: 28,
    name: "Architecte de Merge Hell",
    baseCost: 143000,
    baseInspirationPerSecond: 840,
    quantity: 0,
    unlocked: false
  },
  {
    id: 29,
    name: "Chuchoteur de Code Legacy",
    baseCost: 162000,
    baseInspirationPerSecond: 950,
    quantity: 0,
    unlocked: false
  },
  {
    id: 30,
    name: "Invocateur de Null Pointer",
    baseCost: 182000,
    baseInspirationPerSecond: 1070,
    quantity: 0,
    unlocked: false
  },
  {
    id: 31,
    name: "Détective de Réunion Inutile",
    baseCost: 203000,
    baseInspirationPerSecond: 1200,
    quantity: 0,
    unlocked: false
  },
  {
    id: 32,
    name: "BurnoutBot 3000",
    baseCost: 225000,
    baseInspirationPerSecond: 1340,
    quantity: 0,
    unlocked: false
  },
  {
    id: 33,
    name: "Fanatique du Point-Virgule",
    baseCost: 248000,
    baseInspirationPerSecond: 1490,
    quantity: 0,
    unlocked: false
  },
  {
    id: 34,
    name: "Senior de l’Ombre",
    baseCost: 272000,
    baseInspirationPerSecond: 1650,
    quantity: 0,
    unlocked: false
  },
  {
    id: 35,
    name: "Prêtre de la Boucle Infinie",
    baseCost: 297000,
    baseInspirationPerSecond: 1820,
    quantity: 0,
    unlocked: false
  },
  {
    id: 36,
    name: "Magicien Full-Stack",
    baseCost: 323000,
    baseInspirationPerSecond: 2000,
    quantity: 0,
    unlocked: false
  },
  {
    id: 37,
    name: "Démon QA Intraitable",
    baseCost: 350000,
    baseInspirationPerSecond: 2190,
    quantity: 0,
    unlocked: false
  },
  {
    id: 38,
    name: "Messie du JSON",
    baseCost: 378000,
    baseInspirationPerSecond: 2390,
    quantity: 0,
    unlocked: false
  },
  {
    id: 39,
    name: "Dompteur de Timeouts",
    baseCost: 407000,
    baseInspirationPerSecond: 2600,
    quantity: 0,
    unlocked: false
  },
  {
    id: 40,
    name: "Copilot Divin",
    baseCost: 437000,
    baseInspirationPerSecond: 2820,
    quantity: 0,
    unlocked: false
  },
  {
    id: 41,
    name: "Scroll Infiniment",
    baseCost: 468000,
    baseInspirationPerSecond: 3050,
    quantity: 0,
    unlocked: false
  },
  {
    id: 42,
    name: "Compilateur à Café",
    baseCost: 500000,
    baseInspirationPerSecond: 3290,
    quantity: 0,
    unlocked: false
  },
  {
    id: 43,
    name: "Senior Silencieux",
    baseCost: 533000,
    baseInspirationPerSecond: 3540,
    quantity: 0,
    unlocked: false
  },
  {
    id: 44,
    name: "Illusion Turingienne",
    baseCost: 567000,
    baseInspirationPerSecond: 3800,
    quantity: 0,
    unlocked: false
  },
  {
    id: 45,
    name: "Méta-Framework Mystique",
    baseCost: 602000,
    baseInspirationPerSecond: 4070,
    quantity: 0,
    unlocked: false
  },
  {
    id: 46,
    name: "Explorateur de la Dimension 404",
    baseCost: 638000,
    baseInspirationPerSecond: 4350,
    quantity: 0,
    unlocked: false
  }
];

export default GeneratorsData;
