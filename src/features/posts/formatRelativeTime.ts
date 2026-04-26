/**
 * Produces a human-readable relative time string for a Unix timestamp.
 *
 * @param timeSeconds - The timestamp to compare, expressed as seconds since the Unix epoch.
 * @returns A relative time string:
 * - `in a few seconds` if the timestamp is in the future,
 * - `just now` if within the last minute,
 * - `{n} minute(s) ago`, `{n} hour(s) ago`, or `{n} day(s) ago` for larger intervals (singular form used when `n` is 1).
 */
export function formatRelativeTime(timeSeconds: number): string {
  const SECOND = 1;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const nowSeconds = Math.floor(Date.now() / 1000);
  const diff = nowSeconds - Math.floor(timeSeconds);

  if (diff < MINUTE) {
    return 'just now';
  }
  if (diff < HOUR) {
    const mins = Math.floor(diff / MINUTE);
    return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  }
  if (diff < DAY) {
    const hrs = Math.floor(diff / HOUR);
    return `${hrs} hour${hrs === 1 ? '' : 's'} ago`;
  }
  const days = Math.floor(diff / DAY);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}