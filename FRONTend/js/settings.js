import { fetchFromAPI } from "./api.js";

export async function getSettings() {
  try {
    const response = await fetchFromAPI("/api/site-setting");

    return response.data;
  } catch (error) {
    console.error("Could not fetch site settings:", error);
    return null;
  }
}
