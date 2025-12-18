// Feedback.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Feedback from "./Feedback";

// Mock Header & Footer 
jest.mock("./Header", () => () => <div>Header Component</div>);
jest.mock("./Footer", () => () => <div>Footer Component</div>);

// Mock localStorage
beforeEach(() => {
  const mockUser = { _id: "123", name: "Test User" };
  Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUser));
});

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ msg: "Feedback Sent Successfully!" }),
  })
);

describe("Feedback Component", () => {
  beforeEach(() => {
    render(<Feedback />);
  });

  it("renders the title and form elements", () => {
    expect(screen.getByText("We Value Your Feedback")).toBeInTheDocument();
    expect(screen.getByText("Rate your experience ⭐⭐⭐⭐⭐")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please share your thoughts/i)).toBeInTheDocument();
    expect(screen.getByText("Send Feedback")).toBeInTheDocument();
  });

  it("allows selecting a rating", () => {
    const excellentRadio = screen.getByLabelText("Excellent");
    const goodRadio = screen.getByLabelText("Good");

    fireEvent.click(excellentRadio);
    expect(excellentRadio.checked).toBe(true);

    fireEvent.click(goodRadio);
    expect(goodRadio.checked).toBe(true);
  });

  it("allows typing in the description textarea", () => {
    const textarea = screen.getByPlaceholderText(/Please share your thoughts/i);
    fireEvent.change(textarea, { target: { value: "Great platform!" } });
    expect(textarea.value).toBe("Great platform!");
  });

  it("alerts when rating or description is missing", () => {
    window.alert = jest.fn();
    const sendBtn = screen.getByText("Send Feedback");
    fireEvent.click(sendBtn);
    expect(window.alert).toHaveBeenCalledWith("Please select a rating and write a description.");
  });

 
});
