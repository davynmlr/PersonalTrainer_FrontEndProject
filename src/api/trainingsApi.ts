import type { TrainingWithCustomer } from "../types/training";
import { API_URL } from "./config";

export function getTrainings(): Promise<TrainingWithCustomer[]> {
  return fetch(API_URL + "/gettrainings").then((response) => {
    if (!response.ok) {
      throw new Error("Error when fetching trainings");
    }

    return response.json();
  });
}
