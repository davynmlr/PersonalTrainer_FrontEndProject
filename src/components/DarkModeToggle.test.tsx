import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import DarkModeToggle from "./DarkModeToggle";

function renderToggle() {
  render(
    <ThemeProvider theme={theme}>
      <DarkModeToggle />
    </ThemeProvider>,
  );
}

// Start every test without a saved choice
beforeEach(() => {
  localStorage.clear();
});

describe("DarkModeToggle", () => {
  test("starts in light mode when the computer uses light mode", () => {
    renderToggle();

    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
  });

  test("switches to dark mode and back", async () => {
    renderToggle();

    await userEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
  });

  test("remembers the choice for the next visit", async () => {
    renderToggle();

    await userEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));

    // MUI saves the choice in the browser's localStorage
    expect(localStorage.getItem("mui-mode")).toBe("dark");
  });
});
