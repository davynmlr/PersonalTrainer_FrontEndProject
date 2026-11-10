import type { TrainingData, TrainingWithCustomer } from "../types/training";
import { API_URL } from "./config";

export function getTrainings(): Promise<TrainingWithCustomer[]> {
  return fetch(API_URL + "/gettrainings").then((response) => {
    if (!response.ok) {
      throw new Error("Error when fetching trainings");
    }

    return response.json();
  });
}

export function addTraining(training: TrainingData) {
  return fetch(API_URL + "/trainings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(training),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when adding a new training");
    }

    return response.json();
  });
}

export function deleteTraining(id: number) {
  return fetch(API_URL + "/trainings/" + id, { method: "DELETE" }).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Error when deleting the training");
      }
    },
  );
}
