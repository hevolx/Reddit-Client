/**
 * Formats a numeric score into a compact human-readable string.
 *
 * Values greater than or equal to 1,000,000 are divided by 1,000,000, formatted to one decimal place and suffixed with `M`; values greater than or equal to 1,000 are divided by 1,000, formatted to one decimal place and suffixed with `k`; smaller values are returned as a plain decimal string.
 *
 * @param score - The numeric score to format
 * @returns A compact string representation (`"x.xM"`, `"x.xk"`, or the plain number as a string)
 */
export function formatScore(score: number) {
  if (score >= 1000000) {
    return (score / 1000000).toFixed(1) + 'M';
  }
  if (score >= 1000) {
    return (score / 1000).toFixed(1) + 'k';
  }
  return score.toString();
}