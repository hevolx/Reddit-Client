import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatRelativeTime } from '../../../src/features/posts/formatRelativeTime';

// Fixed point in time: 2024-01-15T12:00:00.000Z (Unix seconds: 1705320000)
const FIXED_NOW_MS = 1705320000 * 1000;
const FIXED_NOW_S = 1705320000;

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_NOW_MS);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "just now" for less than 1 minute ago', () => {
    // Arrange
    const time = FIXED_NOW_S - 30;

    // Act
    const result = formatRelativeTime(time);

    // Assert
    expect(result).toBe('just now');
  });

  it('returns "X minutes ago" for minutes', () => {
    // Arrange
    const time = FIXED_NOW_S - 5 * 60;

    // Act
    const result = formatRelativeTime(time);

    // Assert
    expect(result).toBe('5 minutes ago');
  });

  it('returns "X hours ago" for hours', () => {
    // Arrange
    const time = FIXED_NOW_S - 3 * 60 * 60;

    // Act
    const result = formatRelativeTime(time);

    // Assert
    expect(result).toBe('3 hours ago');
  });

  it('returns "X days ago" for days', () => {
    // Arrange
    const time = FIXED_NOW_S - 2 * 24 * 60 * 60;

    // Act
    const result = formatRelativeTime(time);

    // Assert
    expect(result).toBe('2 days ago');
  });

  it('returns "in a few seconds" for future timestamps', () => {
    // Arrange
    const time = FIXED_NOW_S + 60;

    // Act
    const result = formatRelativeTime(time);

    // Assert
    expect(result).toBe('in a few seconds');
  });
});
