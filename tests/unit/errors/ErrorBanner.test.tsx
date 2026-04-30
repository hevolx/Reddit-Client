import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorBanner from "../../../src/components/ErrorBanner";

describe("ErrorBanner", () => {
  it("renders message prop as text", () => {
    render(<ErrorBanner message="Something went wrong" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
