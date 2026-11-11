import type { Dayjs } from "dayjs";
import type { TrainingData, TrainingFormData } from "../types/training";

// Empty form, with the date already filled in
export function newTrainingForm(date: Dayjs): TrainingFormData {
  return { date: date, activity: "", duration: "" };
}

// The form can be saved when it has a valid date, an activity and a duration above 0
export function isTrainingFormValid(form: TrainingFormData): boolean {
  return (
    form.date !== null &&
    form.date.isValid() &&
    form.activity.trim() !== "" &&
    parseInt(form.duration) > 0
  );
}

// Turns the form values into the body for POST /trainings
export function toTrainingData(
  form: TrainingFormData,
  customerUrl: string,
): TrainingData {
  return {
    date: form.date ? form.date.toISOString() : "",
    activity: form.activity.trim(),
    duration: parseInt(form.duration),
    customer: customerUrl,
  };
}
