export function formatScore(score: number) {
  if (score >= 1000000) {
    return (score / 1000000).toFixed(1).replace(/\$/, '') + 'M';
  }
  if (score >= 1000) {
    return (score / 1000).toFixed(1).replace(/\$/, '') + 'k';
  }
  return score.toString();
}