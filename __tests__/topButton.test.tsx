import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TopButton from "../src/components/layout/top_button/topButton";
import React from "react";
import "@testing-library/jest-dom";

describe("TopButton", () => {
  it("should render the button with an icon", () => {
    render(<TopButton />);

    const buttonElement = screen.getByTestId("top-button");
    const iconElement = screen.getByTestId("top-button-icon");

    expect(buttonElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it("should scroll to the top of the page when clicked", () => {
    render(<TopButton />);

    const scrollEvent = vi.spyOn(window, "scrollTo");

    const buttonElement = screen.getByTestId("top-button");
    fireEvent.click(buttonElement);

    expect(scrollEvent).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });


  it("should not have 'show-elevator' class when isTarget is false", () => {
    render(<TopButton />);

    const buttonElement = screen.getByTestId("top-button");
    expect(buttonElement).not.toHaveClass("show-elevator");
  });
});
