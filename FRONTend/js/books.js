import { fetchFromAPI } from "./api.js";

export async function getBooks() {
  try {
    const response = await fetchFromAPI(
        "/api/books?populate=coverImage"
    );
    
    return response.data;
  } catch (error) {
    console.error("Could not fetch books:", error);
    return [];
  }
}

export async function getBook(documentId) {
  try {
    const response = await fetchFromAPI(
      `/api/books/${documentId}?populate=coverImage`
    );

      return response.data;
  } catch (error) {
    console.error("Could not fetch book:", error);
    return null;
  }
}