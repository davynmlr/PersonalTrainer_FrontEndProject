import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";
import type { Training } from "../types/training";

export type ActivityMinutes = {
  activity: string;
  minutes: number;
};

// Total training minutes per activity, biggest first
export function getMinutesByActivity(trainings: Training[]): ActivityMinutes[] {
  const groups = groupBy(trainings, (training) => training.activity);

  return Object.entries(groups)
    .map(([activity, trainingsOfActivity]) => ({
      activity: activity,
      minutes: sumBy(trainingsOfActivity, "duration"),
    }))
    .sort((a, b) => b.minutes - a.minutes);
}
