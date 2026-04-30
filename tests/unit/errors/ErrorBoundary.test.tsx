import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import ErrorBoundary from "../../../src/components/ErrorBoundary";

function Bomb(): never {
  throw new Error("boom");
}

let shouldRecover = false;
function RecoveringBomb() {
  if (!shouldRecover) throw new Error("boom");
  return <p data-testid="recovered">recovered</p>;
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    shouldRecover = false;
    vi.spyOn(console, "error").mockImplementation(() => { });
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

  it("logs the error to console.error", () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();
  });

  it("resets the error state when Try again is clicked", async () => {
    shouldRecover = false;
    render(
      <ErrorBoundary>
        <RecoveringBomb />
      </ErrorBoundary>
    );
    shouldRecover = true;
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(screen.queryByTestId("error-fallback")).not.toBeInTheDocument();
    expect(screen.getByTestId("recovered")).toBeInTheDocument();
  });
});
