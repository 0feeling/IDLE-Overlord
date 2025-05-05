// Calcule le taux total d'inspiration généré automatiquement
export const calculateTotalRate = (generators) => {
  return Object.values(generators || {}).reduce(
    (acc, gen) => acc + gen.rate * gen.count,
    0
  );
};
