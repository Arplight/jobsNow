import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SkillPill from "../src/components/common/skill_pill/skillPill";
import React from "react";
import "@testing-library/jest-dom";

describe("Skill Component", () => {
  it("should render skill name and link", () => {
    render(
      <MemoryRouter>
        <SkillPill
          skillName="JavaScript"
          skillLink="UUID"
          skillIsLoading={false}
        />
      </MemoryRouter>
    );

    const linkElement = screen.getByText("JavaScript");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/skill/UUID");
  });

  it("should show loading spinner when skillIsLoading is true", () => {
    render(
      <MemoryRouter>
        <SkillPill
          skillName="TypeScript"
          skillLink="UUID"
          skillIsLoading={true}
        />
      </MemoryRouter>
    );

    const loaderElement = screen.getByTestId("skill-loader");
    expect(loaderElement).toBeInTheDocument();
  });

  it("should slice skillName if it is longer than 20 characters", () => {
    render(
      <MemoryRouter>
        <SkillPill
          skillName="loremloremloremloremloremloremloremloremloremlorem"
          skillLink="UUID"
          skillIsLoading={false}
        />
      </MemoryRouter>
    );

    const truncatedText = screen.getByText("loremloremloremlorem...");
    expect(truncatedText).toBeInTheDocument();
  });

  it("should render full skillName if it is 20 characters or less", () => {
    render(
      <MemoryRouter>
        <SkillPill
          skillName="ShortSkill"
          skillLink="UUID"
          skillIsLoading={false}
        />
      </MemoryRouter>
    );

    const fullText = screen.getByText("ShortSkill");
    expect(fullText).toBeInTheDocument();
  });
});
