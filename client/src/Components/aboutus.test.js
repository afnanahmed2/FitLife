// aboutus.test.js
import { render, screen } from "@testing-library/react";
import AboutDevelopers from "./AboutDevelopers"; 

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Testing AboutDevelopers component", () => {
  it("renders heading About the Developers", () => {
    render(<AboutDevelopers />);
    const heading = screen.getByText("About the Developers");
    expect(heading).toBeInTheDocument();
  });

  it("renders all developer names", () => {
    render(<AboutDevelopers />);
    expect(screen.getByText("AlZina Al-Kamyani")).toBeInTheDocument();
    expect(screen.getByText("Afnan & AlZina")).toBeInTheDocument();
    expect(screen.getByText("Afnan Al-Subhi")).toBeInTheDocument();
  });

  it("renders References Used heading", () => {
    render(<AboutDevelopers />);
    const refHeading = screen.getByText("References Used");
    expect(refHeading).toBeInTheDocument();
  });
});
