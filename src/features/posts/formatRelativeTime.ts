export function formatRelativeTime(time: number): string {

  const published = (Date.now() / 1000) - time

  if (published < 60) {
    return 'just now'
  } else {
    return `${published} minutes ago`
  }
}