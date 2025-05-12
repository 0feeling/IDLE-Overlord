export const ValidationService = {
  isExactMatch: (step, code, patternSet) => {
    const regexString = patternSet[step]?.toString().replace(/^\/|\/$/g, "");
    return new RegExp(`^${regexString}$`, "i").test(code.trim());
  },

  isApproximateMatch: (step, code, patternSet) => {
    return patternSet?.[step]?.test(code.trim());
  }
};
