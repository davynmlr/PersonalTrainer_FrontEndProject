import { describe, expect, test } from "vitest";
import { getActivityColors } from "./activityColors";

describe("getActivityColors", () => {
  test("gives every activity a different color", () => {
    const colors = getActivityColors(["Gym", "Yoga", "Cycling"]);

    expect(Object.keys(colors)).toHaveLength(3);
    expect(new Set(Object.values(colors)).size).toBe(3);
  });

  test("gives the same activity the same color", () => {
    const colors = getActivityColors(["Gym", "Yoga", "Gym"]);

    expect(Object.keys(colors)).toEqual(["Gym", "Yoga"]);
  });

  test("does not depend on the order of the trainings", () => {
    const first = getActivityColors(["Gym", "Yoga"]);
    const second = getActivityColors(["Yoga", "Gym"]);

    expect(first).toEqual(second);
  });
});
