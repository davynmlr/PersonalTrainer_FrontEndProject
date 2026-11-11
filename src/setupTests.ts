// Runs before every test file
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
// Adds checks like toBeInTheDocument() and toBeDisabled()
import "@testing-library/jest-dom/vitest";

// Remove the rendered components after each test
afterEach(() => {
  cleanup();
});
