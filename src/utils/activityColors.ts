// Colors for the calendar events (dark enough for white text)
const ACTIVITY_COLORS = [
  "#1976d2",
  "#2e7d32",
  "#e65100",
  "#7b1fa2",
  "#c62828",
  "#00838f",
  "#5d4037",
  "#ad1457",
  "#283593",
  "#558b2f",
];

// Colors are assigned by alphabetical order and repeat if there are more activities than colors.
export function getActivityColors(activities: string[]): Record<string, string> {
  const names = [...new Set(activities)].sort();
  const colors: Record<string, string> = {};

  names.forEach((name, index) => {
    colors[name] = ACTIVITY_COLORS[index % ACTIVITY_COLORS.length];
  });

  return colors;
}
