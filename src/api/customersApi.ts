import type { Customer, CustomerData } from "../types/customer";
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

export function addCustomer(customer: CustomerData) {
  return fetch(API_URL + "/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when adding a new customer");
    }

    return response.json();
  });
}

// url is the customer's _links.self.href
export function updateCustomer(url: string, customer: CustomerData) {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when updating the customer");
    }

    return response.json();
  });
}

// Deleting a customer also deletes all their trainings
export function deleteCustomer(url: string) {
  return fetch(url, { method: "DELETE" }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when deleting the customer");
    }
  });
}
