// Runs before every test file
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
// Adds checks like toBeInTheDocument() and toBeDisabled()
import "@testing-library/jest-dom/vitest";

// Remove the rendered components after each test
afterEach(() => {
  cleanup();
});

// The fake browser (jsdom) has no matchMedia. MUI uses it to read the
// computer's light/dark setting, so tests get a simple version that always
// answers "no" (= the computer uses light mode).
window.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});
