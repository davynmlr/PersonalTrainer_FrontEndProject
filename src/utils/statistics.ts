import countBy from "lodash/countBy";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";
import type { Training, TrainingWithCustomer } from "../types/training";
import { formatFullName } from "./formatters";

export type ActivityMinutes = {
  activity: string;
  minutes: number;
};

export type CustomerMinutes = {
  customer: string;
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

// Total training minutes per customer, biggest first.
// Grouped by customer id, so two customers with the same name stay separate.
export function getMinutesByCustomer(
  trainings: TrainingWithCustomer[],
): CustomerMinutes[] {
  const groups = groupBy(trainings, (training) => training.customer?.id ?? "none");

  return Object.values(groups)
    .map((trainingsOfCustomer) => ({
      customer: formatFullName(trainingsOfCustomer[0].customer) || "Unknown",
      minutes: sumBy(trainingsOfCustomer, "duration"),
    }))
    .sort((a, b) => b.minutes - a.minutes);
}

// All training minutes as hours, rounded to one decimal (e.g. 6.3)
export function getTotalHours(trainings: Training[]): number {
  const minutes = sumBy(trainings, "duration");
  return Math.round((minutes / 60) * 10) / 10;
}

// The activity with the most trainings, or "-" when there are no trainings
export function getMostPopularActivity(trainings: Training[]): string {
  const counts = countBy(trainings, (training) => training.activity);
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return sorted.length > 0 ? sorted[0][0] : "-";
}
