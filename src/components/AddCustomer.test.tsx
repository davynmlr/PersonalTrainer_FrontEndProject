import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCustomer from "./AddCustomer";

describe("AddCustomer", () => {
  test("opens the form when Add Customer is clicked", async () => {
    render(<AddCustomer fetchCustomers={vi.fn()} showMessage={vi.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: /add customer/i }));

    expect(screen.getByText("New Customer")).toBeInTheDocument();
  });

  test("Save is disabled until first and last name are filled in", async () => {
    render(<AddCustomer fetchCustomers={vi.fn()} showMessage={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: /add customer/i }));

    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeDisabled();

    await userEvent.type(screen.getByRole("textbox", { name: /first name/i }), "Sally");
    expect(saveButton).toBeDisabled();

    await userEvent.type(screen.getByRole("textbox", { name: /last name/i }), "Gareth");
    expect(saveButton).toBeEnabled();
  });
});
