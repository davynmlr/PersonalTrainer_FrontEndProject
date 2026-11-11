import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NavLinks from "./NavLinks";

// MemoryRouter: a router for tests, which starts on the page we give it
function renderOnPage(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <NavLinks />
    </MemoryRouter>,
  );
}

describe("NavLinks", () => {
  test("marks the link of the open page as active", () => {
    renderOnPage("/trainings");

    // NavLink adds aria-current="page" (and the class "active") to the open page
    const trainingsLink = screen.getByRole("link", { name: "Trainings" });
    const customersLink = screen.getByRole("link", { name: "Customers" });

    expect(trainingsLink).toHaveAttribute("aria-current", "page");
    expect(trainingsLink).toHaveClass("active");
    expect(customersLink).not.toHaveAttribute("aria-current");
  });

  test("the phone menu lists all pages and marks the open one", async () => {
    renderOnPage("/calendar");

    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems.map((item) => item.textContent)).toEqual([
      "Customers",
      "Trainings",
      "Calendar",
      "Statistics",
    ]);
    expect(screen.getByRole("menuitem", { name: "Calendar" })).toHaveClass("active");
  });
});
