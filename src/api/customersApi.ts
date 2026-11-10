import type { Customer } from "../types/customer";
import { API_URL } from "./config";

export function getCustomers(): Promise<Customer[]> {
  return fetch(API_URL + "/customers")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error when fetching customers");
      }

      return response.json();
    })
    .then((data) => data._embedded.customers);
}
