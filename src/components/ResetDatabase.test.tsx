import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResetDatabase from "./ResetDatabase";
import { RESET_URL } from "../api/databaseApi";

// Put the real fetch back after each test
afterEach(() => {
  vi.restoreAllMocks();
});

describe("ResetDatabase", () => {
  test("does nothing when the user answers No", async () => {
    // Fake fetch: the real API is never called in the tests
    const fakeFetch = vi.spyOn(globalThis, "fetch");
    const onReset = vi.fn();
    render(<ResetDatabase onReset={onReset} showMessage={vi.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: /reset data/i }));
    await userEvent.click(screen.getByRole("button", { name: "No" }));

    expect(fakeFetch).not.toHaveBeenCalled();
    expect(onReset).not.toHaveBeenCalled();
  });

  test("sends POST /reset when the user answers Yes", async () => {
    const fakeFetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("DB reset done"));
    const onReset = vi.fn();
    const showMessage = vi.fn();
    render(<ResetDatabase onReset={onReset} showMessage={showMessage} />);

    await userEvent.click(screen.getByRole("button", { name: /reset data/i }));
    await userEvent.click(screen.getByRole("button", { name: "Yes" }));

    expect(fakeFetch).toHaveBeenCalledWith(RESET_URL, { method: "POST" });
    // waitFor: the answer from fetch arrives a moment later
    await waitFor(() => expect(onReset).toHaveBeenCalled());
    expect(showMessage).toHaveBeenCalledWith("Database reset to the demo data");
  });

  test("shows an error message when the reset fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Server error", { status: 500 }),
    );
    const onReset = vi.fn();
    const showMessage = vi.fn();
    render(<ResetDatabase onReset={onReset} showMessage={showMessage} />);

    await userEvent.click(screen.getByRole("button", { name: /reset data/i }));
    await userEvent.click(screen.getByRole("button", { name: "Yes" }));

    await waitFor(() =>
      expect(showMessage).toHaveBeenCalledWith("Error when resetting the database"),
    );
    expect(onReset).not.toHaveBeenCalled();
  });
});
