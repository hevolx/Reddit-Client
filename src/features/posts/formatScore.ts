/**
 * Formats a numeric score into a compact human-readable string.
 *
 * Values greater than or equal to 1,000,000 are divided by 1,000,000, formatted to one decimal place and suffixed with `M`; values greater than or equal to 1,000 are divided by 1,000, formatted to one decimal place and suffixed with `k`; smaller values are returned as a plain decimal string.
 *
 * @param score - The numeric score to format
 * @returns A compact string representation (`"x.xM"`, `"x.xk"`, or the plain number as a string)
 */
export function formatScore(score: number) {
  const abs = Math.abs(score);
  const sign = score < 0 ? '-' : '';
  if (abs >= 1000000) {
    return sign + (abs / 1000000).toFixed(1) + 'M';
  }
  if (abs >= 1000) {
    const k = Number((abs / 1000).toFixed(1));
    if (k >= 1000) {
      return sign + '1.0M';
    }
    return sign + k.toFixed(1) + 'k';
  }
  return sign + abs.toString();
}