import dayjs from "dayjs";

// Formats a date as DD.MM.YYYY HH:mm
export function formatDateTime(date: string | Date | null) {
  if (!date) return "";
  return dayjs(date).format("DD.MM.YYYY HH:mm");
}

export function formatFullName(
  person: { firstname: string; lastname: string } | null,
) {
  if (!person) return "";
  return person.firstname + " " + person.lastname;
}
