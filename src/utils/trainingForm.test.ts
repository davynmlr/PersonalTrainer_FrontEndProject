import { describe, expect, test } from "vitest";
import dayjs from "dayjs";
import { isTrainingFormValid, newTrainingForm, toTrainingData } from "./trainingForm";

const date = dayjs("2026-11-20T08:30:00");

describe("isTrainingFormValid", () => {
  test("is valid with a date, an activity and a duration", () => {
    expect(isTrainingFormValid({ date: date, activity: "Gym", duration: "60" })).toBe(true);
  });

  test("is not valid without an activity", () => {
    expect(isTrainingFormValid({ date: date, activity: "  ", duration: "60" })).toBe(false);
  });

  test("is not valid when the duration is 0 or empty", () => {
    expect(isTrainingFormValid({ date: date, activity: "Gym", duration: "0" })).toBe(false);
    expect(isTrainingFormValid({ date: date, activity: "Gym", duration: "" })).toBe(false);
  });

  test("a new form is not valid until it is filled in", () => {
    expect(isTrainingFormValid(newTrainingForm(date))).toBe(false);
  });
});

describe("toTrainingData", () => {
  test("turns the form into the body for the API", () => {
    const data = toTrainingData(
      { date: date, activity: " Gym ", duration: "45" },
      "https://example.com/api/customers/1",
    );

    expect(data).toEqual({
      date: date.toISOString(),
      activity: "Gym",
      duration: 45,
      customer: "https://example.com/api/customers/1",
    });
  });
});
