import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Testing Header component", () => {

  beforeEach(() => {
    render(<Header />);
  });

  it("should render logo image", () => {
    const logo = screen.getByAltText("FitLife Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render first header text", () => {
    const text1 = screen.getByText("Push your limits and discover your strength.");
    expect(text1).toBeInTheDocument();
  });

  it("should render second header text", () => {
    const text2 = screen.getByText("Train with passion and transform your body and mind.");
    expect(text2).toBeInTheDocument();
  });

  it("should render Profile link", () => {
    const profileLink = screen.getByText("Profile");
    expect(profileLink).toBeInTheDocument();
    expect(profileLink.closest("a")).toHaveAttribute("href", "/Profile");
  });

  it("should render Feedback link", () => {
    const feedbackLink = screen.getByText("Feedback");
    expect(feedbackLink).toBeInTheDocument();
    expect(feedbackLink.closest("a")).toHaveAttribute("href", "/Feedback");
  });

  it("should render About Developer link", () => {
    const aboutLink = screen.getByText("A Bout Developer");
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.closest("a")).toHaveAttribute("href", "/aboutDevelopers");
  });

});
