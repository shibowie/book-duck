export const API_URL = "http://localhost:1337";

export async function fetchFromAPI(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("API-anropet misslyckades");
  }

  return await response.json();
}
