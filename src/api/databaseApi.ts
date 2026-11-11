import { API_URL } from "./config";

// The reset address is next to /api, not inside it:
// https://...rahtiapp.fi/api  ->  https://...rahtiapp.fi/reset
export const RESET_URL = API_URL.replace(/\/api$/, "") + "/reset";

// Puts the original demo customers and trainings back.
// Note: the API is shared, so this resets the data for everyone.
export function resetDatabase() {
  return fetch(RESET_URL, { method: "POST" }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when resetting the database");
    }
    // The answer is plain text ("DB reset done"), not JSON
    return response.text();
  });
}
