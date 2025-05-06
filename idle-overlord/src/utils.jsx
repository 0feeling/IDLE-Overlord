// Calcule le taux total d'inspiration généré automatiquement
export const calculateTotalRate = (generators) => {
  if (!generators) return 0;

  return Object.values(generators).reduce(
    (acc, gen) =>
      acc +
      (gen.rate || gen.baseInspirationPerSecond || 0) *
        (gen.count || gen.quantity || 0),
    0
  );
};
