import { describe, it, expect } from 'vitest';
import { formatScore } from '../../../src/features/posts/formatScore';

describe('formatScore', () => {
  it("returns '0' for input 0", () => {
    expect(formatScore(0)).toBe('0');
  });

  it("returns '999' for input 999", () => {
    expect(formatScore(999)).toBe('999');
  });

  it("returns '1.0k' for input 1000", () => {
    expect(formatScore(1000)).toBe('1.0k');
  });

  it("returns '35.8k' for input 35800", () => {
    expect(formatScore(35800)).toBe('35.8k');
  });

  it("returns '1.5M' for input 1500000", () => {
    expect(formatScore(1500000)).toBe('1.5M');
  });
});
