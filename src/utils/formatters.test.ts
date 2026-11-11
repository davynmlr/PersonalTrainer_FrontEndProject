import { describe, expect, test } from "vitest";
import { formatDateTime, formatFullName } from "./formatters";

describe("formatDateTime", () => {
  test("formats a date as DD.MM.YYYY HH:mm", () => {
    expect(formatDateTime("2026-11-20T08:30:00")).toBe("20.11.2026 08:30");
  });

  test("returns an empty string when there is no date", () => {
    expect(formatDateTime(null)).toBe("");
  });
});

describe("formatFullName", () => {
  test("joins first and last name", () => {
    expect(formatFullName({ firstname: "Sally", lastname: "Gareth" })).toBe(
      "Sally Gareth",
    );
  });

  test("returns an empty string when there is no person", () => {
    expect(formatFullName(null)).toBe("");
  });
});
