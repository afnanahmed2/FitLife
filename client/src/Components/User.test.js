// User.test.js
import { render, screen } from "@testing-library/react";
import User from "./User";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// slice
const mockStore = configureStore({
  reducer: {
    users: (state = { user: { name: "Test User", email: "test@example.com" } }) => state,
  },
});

describe("Testing User component", () => {
  it("renders user image", () => {
    render(
      <Provider store={mockStore}>
        <User />
      </Provider>
    );
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("renders user name and email", () => {
    render(
      <Provider store={mockStore}>
        <User />
      </Provider>
    );
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });
});
