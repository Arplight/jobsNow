import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../src/components/layout/navbar/components/search_bar/searchBar";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

// search menu data mocking
const mockSearchResults = [
  {
    id: 1,
    attributes: {
      title: "Test Job 1",
    },
  },
  {
    id: 2,
    attributes: {
      title: "Test Job 2",
    },
  },
];

vi.mock("react-redux", () => ({
  ...vi.importActual("react-redux"),
  useSelector: vi.fn(),
  useDispatch: () => vi.fn(),
}));

vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useLocation: () => ({
    pathname: "/test-path",
  }),
  useNavigate: () => vi.fn(),
  useSearchParams: () => [new URLSearchParams("?query=test")],
}));

describe("Search bar", () => {
  beforeEach(() => {
    (useSelector as vi.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        jobs: {
          searchResults: mockSearchResults,
        },
      })
    );

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
  });

  it("should display necessary inputs and elements", () => {
    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    expect(searchButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "test" } });

    const searchMenuItem = screen.getAllByTestId("search-menu-item");
    expect(searchMenuItem[0]).toBeInTheDocument();

    const closeButton = screen.getByTestId("search-close-button");
    expect(closeButton).toBeInTheDocument();
  });

  it("should open when the user start searching", () => {
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });
    const searchMenu = screen.getByTestId("search-menu");
    expect(searchMenu).toBeInTheDocument();
  });
  it("should close the search menu when onClick with the close button", () => {
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });
    const searchMenu = screen.getByTestId("search-menu");

    const closeButton = screen.getByTestId("search-close-button");
    fireEvent.click(closeButton);
    expect(searchMenu).not.toBeInTheDocument();
  });
  it("should close when the user select a search result", () => {
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });
    const searchMenu = screen.getByTestId("search-menu");

    const searchMenuItem = screen.getAllByTestId("search-menu-item");
    fireEvent.click(searchMenuItem[0]);
    expect(searchMenu).not.toBeInTheDocument();
  });
});
