import { getBooks } from "./js/books.js";
import { getSettings } from "./js/settings.js";
import { themes } from "./js/themes.js";

const bookList = document.querySelector("#book-list");
const prevButton = document.querySelector("#prev-book");
const nextButton = document.querySelector("#next-book");

let books = [];
let activeIndex = 0;

async function displayBooks() {
  const settings = await getSettings();

  const activeTheme =
    settings?.theme && themes[settings.theme]
      ? settings.theme
      : "classic";

  books = await getBooks();

  bookList.innerHTML = "";

  if (books.length === 0) {
    bookList.innerHTML = "<p>No books could be loaded.</p>";
    return;
  }

  books.forEach((book, index) => {
    const bookCard = document.createElement("article");
    bookCard.classList.add("book-card");

    const coverUrl = book.coverImage?.url
      ? `http://localhost:1337${book.coverImage.url}`
      : "";
    
    bookCard.innerHTML = `
      <div class="book-cover">
        ${
          coverUrl
            ? `<img src="${coverUrl}" alt="Cover of ${book.title}">`
            : "<div class='no-cover'>No cover available</div>"
        }
      </div>

      <div class="book-info">
        <h3>${book.title}</h3>

        <p class="book-author">
          By: ${book.author}
        </p>

        <p class="book-meta">
          First release date: ${book.publicationDate
            ? book.publicationDate.slice(0, 4)
            : "Unknown"}
        </p>
            
        <p class="book-meta">
          Pages: ${book.pageCount ?? "Unknown"}
        </p>

        <p class="book-description">
          ${book.description || "No description available."}
        </p>
      </div>
    `;

    const genreColor = themes[activeTheme].genres[book.genre];

    bookCard.style.backgroundColor = genreColor || "#F5C9B5";

    bookCard.dataset.index = index;
    bookList.appendChild(bookCard);
  });

  updateCarousel();
}

function updateCarousel() {
  const cards = bookList.querySelectorAll(".book-card");

  cards.forEach((card, index) => {
    let offset = index - activeIndex;

    // Place cards on the shortest side of the carousel.
    if (offset > books.length / 2) {
      offset -= books.length;
    } else if (offset < -books.length / 2) {
      offset += books.length;
    }

    card.style.setProperty("--offset", offset);

    card.classList.toggle("is-active", offset === 0);

    card.setAttribute(
      "aria-hidden",
      Math.abs(offset) > 2 ? "true" : "false"
    );
  });
}

function showNextBook() {
  activeIndex = (activeIndex + 1) % books.length;
  updateCarousel();
}

function showPreviousBook() {
  activeIndex = (activeIndex - 1 + books.length) % books.length;
  updateCarousel();
}

nextButton.addEventListener("click", showNextBook);
prevButton.addEventListener("click", showPreviousBook);

displayBooks();
