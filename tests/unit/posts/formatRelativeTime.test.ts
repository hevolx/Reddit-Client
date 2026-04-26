import { describe, it, expect } from 'vitest';
import { formatRelativeTime } from '../../../src/features/posts/formatRelativeTime';

const now = () => Math.floor(Date.now() / 1000);

describe('formatRelativeTime', () => {
  it('returns "just now" for less than 1 minute ago', () => {
    // Arrange
    const time = now() - 30;

    // Act
    const result = formatRelativeTime(time);

    // Assert
    expect(result).toBe('just now');
  });

  it('returns "X minutes ago" for minutes', () => {
    // Arrange
    const time = now() - 5 * 60;

    // Act
    const result = formatRelativeTime(time);

    // Assert
    expect(result).toBe('5 minutes ago');
  });

  it('returns "X hours ago" for hours', () => {
    // Arrange
    const time = now() - 3 * 60 * 60;

    // Act
    const result = formatRelativeTime(time);

    // Assert
    expect(result).toBe('3 hours ago');
  });

  it('returns "X days ago" for days', () => {
    // Arrange
    const time = now() - 2 * 24 * 60 * 60;

    // Act
    const result = formatRelativeTime(time);

    // Assert
    expect(result).toBe('2 days ago');
  });
});
