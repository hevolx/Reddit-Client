import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ErrorBoundary from "../../../src/components/ErrorBoundary";

function Bomb(): never {
  throw new Error("boom");
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders children when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <p data-testid="child">hello</p>
      </ErrorBoundary>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
  });
});
