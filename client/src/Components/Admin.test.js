// Admin.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Admin from "./Admin";
import Header from "./Header";
import Footer from "./Footer";

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() =>
    JSON.stringify({ _id: "123", name: "Admin User" })
  );
});

// Mock fetch for both endpoints
beforeAll(() => {
  global.fetch = jest.fn((url) => {
    if (url.endsWith("/getAllFeedback")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            feedbacks: [
              {
                _id: "f1",
                userId: { name: "Test User" },
                rating: "Excellent",
                description: "Great service!",
                createdAt: "2025-12-17T12:00:00Z",
              },
            ],
          }),
      });
    }
    if (url.endsWith("/getAllUsersBookedClasses")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            users: [
              {
                _id: "u1",
                name: "User One",
                bookedClasses: [
                  { className: "Yoga", date: "2025-12-20", time: "10:00 AM" },
                ],
              },
            ],
          }),
      });
    }
    return Promise.reject(new Error("Unknown URL"));
  });
});

describe("Admin Component - Quick Test", () => {
  it("renders the admin dashboard and welcome message", async () => {
    render(<Admin />);
    await waitFor(() => {
      expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Welcome Admin User 👋")).toBeInTheDocument();
    });
  });

  it("renders feedback card with user name, rating, and description", async () => {
    render(<Admin />);
    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
      expect(screen.getByText("Excellent")).toBeInTheDocument();
      expect(screen.getByText("Great service!")).toBeInTheDocument();
    });
  });

  it("renders booked class card with class name, date, and time", async () => {
    render(<Admin />);
    await waitFor(() => {
      expect(screen.getByText("User One")).toBeInTheDocument();
      expect(screen.getByText("Yoga")).toBeInTheDocument();
      expect(screen.getByText("2025-12-20")).toBeInTheDocument();
      expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    });
  });

  it("displays no feedback message if feedback array is empty", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ feedbacks: [] }),
      })
    );

    render(<Admin />);
    await waitFor(() => {
      expect(screen.getByText("No feedback available.")).toBeInTheDocument();
    });
  });

  it("displays no users message if booked classes array is empty", async () => {
    fetch.mockImplementationOnce((url) => {
      if (url.endsWith("/getAllFeedback")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ feedbacks: [] }),
        });
      }
      if (url.endsWith("/getAllUsersBookedClasses")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ users: [] }),
        });
      }
    });

    render(<Admin />);
    await waitFor(() => {
      expect(screen.getByText("No users found.")).toBeInTheDocument();
    });
  });
});
