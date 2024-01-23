import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "../pages/NotFoundPage";

describe("Not Found Page", () => {
  beforeEach(() => {
    render(<NotFoundPage />);
  });

  it('Should display an error code', () => {
    // screen.debug()
    expect(screen.getByTestId("error-code")).toHaveTextContent("404")
  });

  it('Should have a p element that indicates why there is an error', () => {
    expect(screen.getByTestId("indicator")).toHaveTextContent("Nothing exists here!")
  });

  it('Should have an anchor that returns the user to the HomePage', () => {
    const anchorTag = screen.getByTestId("anchor-tag")
    expect(anchorTag.tagName).toBe('A');
  });

  it('Should display the consistent theme svg file.', () => {
    expect(screen.getByTestId("waves")).toBeVisible
  });
});
