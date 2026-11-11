import { describe, expect, test } from "vitest";
import { getMinutesByActivity } from "./statistics";

describe("getMinutesByActivity", () => {
  test("adds up the minutes of each activity, biggest first", () => {
    const trainings = [
      { id: 1, date: "2026-11-01T10:00:00", activity: "Gym", duration: 30 },
      { id: 2, date: "2026-11-02T10:00:00", activity: "Yoga", duration: 45 },
      { id: 3, date: "2026-11-03T10:00:00", activity: "Gym", duration: 60 },
    ];

    expect(getMinutesByActivity(trainings)).toEqual([
      { activity: "Gym", minutes: 90 },
      { activity: "Yoga", minutes: 45 },
    ]);
  });

  test("returns an empty list when there are no trainings", () => {
    expect(getMinutesByActivity([])).toEqual([]);
  });
});
