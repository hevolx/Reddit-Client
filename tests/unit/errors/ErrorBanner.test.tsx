import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ErrorBanner from "../../../src/components/ErrorBanner";

describe("ErrorBanner", () => {
  it("renders message prop as text", () => {
    render(<ErrorBanner message="Something went wrong" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("has role alert", () => {
    render(<ErrorBanner message="Something went wrong" />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders a Try again button when onRetry prop is provided", () => {
    render(<ErrorBanner message="Something went wrong" onRetry={() => {}} />);

    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("calls onRetry when the button is clicked", async () => {
    const onRetry = vi.fn();
    render(<ErrorBanner message="Something went wrong" onRetry={onRetry} />);

    await userEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(onRetry).toHaveBeenCalledOnce();
  });
});
