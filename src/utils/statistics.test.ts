import { describe, expect, test } from "vitest";
import {
  getMinutesByActivity,
  getMinutesByCustomer,
  getMostPopularActivity,
  getTotalHours,
} from "./statistics";

const sally = {
  id: 1,
  firstname: "Sally",
  lastname: "Gareth",
  streetaddress: "",
  postcode: "",
  city: "",
  email: "",
  phone: "",
};
const mike = { ...sally, id: 2, firstname: "Mike", lastname: "Ross" };

const trainings = [
  { id: 1, date: "2026-11-01T10:00:00", activity: "Gym", duration: 30, customer: sally },
  { id: 2, date: "2026-11-02T10:00:00", activity: "Yoga", duration: 45, customer: mike },
  { id: 3, date: "2026-11-03T10:00:00", activity: "Gym", duration: 60, customer: sally },
];

describe("getMinutesByActivity", () => {
  test("adds up the minutes of each activity, biggest first", () => {
    expect(getMinutesByActivity(trainings)).toEqual([
      { activity: "Gym", minutes: 90 },
      { activity: "Yoga", minutes: 45 },
    ]);
  });

  test("returns an empty list when there are no trainings", () => {
    expect(getMinutesByActivity([])).toEqual([]);
  });
});

describe("getMinutesByCustomer", () => {
  test("adds up the minutes of each customer, biggest first", () => {
    expect(getMinutesByCustomer(trainings)).toEqual([
      { customer: "Sally Gareth", minutes: 90 },
      { customer: "Mike Ross", minutes: 45 },
    ]);
  });
});

describe("getTotalHours", () => {
  test("turns all minutes into hours with one decimal", () => {
    // 30 + 45 + 60 = 135 min = 2.25 h -> 2.3
    expect(getTotalHours(trainings)).toBe(2.3);
  });

  test("is 0 when there are no trainings", () => {
    expect(getTotalHours([])).toBe(0);
  });
});

describe("getMostPopularActivity", () => {
  test("returns the activity with the most trainings", () => {
    expect(getMostPopularActivity(trainings)).toBe("Gym");
  });

  test('returns "-" when there are no trainings', () => {
    expect(getMostPopularActivity([])).toBe("-");
  });
});
