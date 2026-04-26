export function formatScore(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\$/, '') + 'k';
  }
  return num.toString();
}