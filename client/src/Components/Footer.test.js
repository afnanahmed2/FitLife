// Footer.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders copyright text", () => {
    expect(screen.getByText("© 2025 FitLife Gym | All Rights Reserved To UTAS-Nizwa")).toBeInTheDocument();
  });


  it("renders Home link correctly", () => {
    const homeLink = screen.getByText("🏠 Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest("a")).toHaveAttribute("href", "/home");
  });

  it("renders Classes link correctly", () => {
    const classesLink = screen.getByText("💪 Classes");
    expect(classesLink).toBeInTheDocument();
    expect(classesLink.closest("a")).toHaveAttribute("href", "/MyClasses");
  });

  it("renders Membership link correctly", () => {
    const membershipLink = screen.getByText("🪪 Membership");
    expect(membershipLink).toBeInTheDocument();
    expect(membershipLink.closest("a")).toHaveAttribute("href", "/MemberShip");
  });

  it("renders Calorie Calculator link correctly", () => {
    const calorieLink = screen.getByText("🍎 Calorie Calculator");
    expect(calorieLink).toBeInTheDocument();
    expect(calorieLink.closest("a")).toHaveAttribute("href", "/CaloriesCalculater");
  });
});
