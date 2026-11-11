// Colors for the calendar events (dark enough for white text)
const ACTIVITY_COLORS = [
  "#1976d2", // blue
  "#2e7d32", // green
  "#e65100", // orange
  "#7b1fa2", // purple
  "#c62828", // red
  "#00838f", // teal
  "#5d4037", // brown
  "#ad1457", // pink
  "#283593", // indigo
  "#558b2f", // olive
];

/**
 * Gives every activity its own color.
 * The activity names are sorted alphabetically, then the first one gets the
 * first color, the second one the second color, and so on. If there are more
 * activities than colors, the colors start again from the beginning.
 *
 * Returns an object like { Cycling: "#1976d2", Gym: "#2e7d32" }
 */
export function getActivityColors(activities: string[]): Record<string, string> {
  const names = [...new Set(activities)].sort();
  const colors: Record<string, string> = {};

  names.forEach((name, index) => {
    colors[name] = ACTIVITY_COLORS[index % ACTIVITY_COLORS.length];
  });

  return colors;
}
