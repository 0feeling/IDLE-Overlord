// Calcule le taux total d'inspiration généré automatiquement
// export const calculateTotalRate = (generators) => {
//   if (!generators) return 0;

//   return Object.values(generators).reduce(
//     (acc, gen) =>
//       acc +
//       (gen.rate || gen.baseInspirationPerSecond || 0) *
//         (gen.count || gen.quantity || 0),
//     0
//   );
// };
// src/utils/generators.js
export const calculateGeneratorCost = (baseCost, count) =>
  Math.floor(baseCost * Math.pow(1.15, count));
