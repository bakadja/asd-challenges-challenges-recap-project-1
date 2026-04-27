import {
  getBooks,
  searchByTitle,
  filterByPublisher,
  selectPublisherTemplate,
  bookTemplate,
  addToFavorite,
  renderFav,
} from "./index";
import type { Book, RenderOption } from "./index";

// DOM
const booksTableElt = document.getElementById(
  "books-table",
) as HTMLTableElement;

const serachElt = document.getElementById("search") as HTMLInputElement;

const selectElt = document.getElementById("by-publisher") as HTMLSelectElement;

const bookLengthEl = document.getElementById("book-length") as HTMLTitleElement;

const favElt = document.getElementById("fav") as HTMLSpanElement;

// start
const books: Book[] = await getBooks();
console.log("test log books", books);
// All books
(() => {
  renderBooks(books);
  renderFav(favElt);
})();
// search by title
serachElt.addEventListener("input", (e) => {
  console.log("input", (e.target as HTMLInputElement).value);

  const value = (e.target as HTMLInputElement).value;
  if (value.length > 0) {
    const result = searchByTitle((e.target as HTMLInputElement).value, books);
    console.log("result", result);
    renderBooks(result);
  } else {
    renderBooks(books);
  }
});

//  filter by  publisher
selectElt.addEventListener("change", (e) => {
  // console.log("option", e.target!.value, e);
  const optionValue = (e.target as HTMLSelectElement).value;
  // console.log("[change]", books);

  if (optionValue === "-") return renderBooks(books);

  const foundBooks = filterByPublisher(optionValue, books);
  // console.log("foundBooks", foundBooks);
  renderBooks(foundBooks, "table");
});

// add to favorite
booksTableElt.addEventListener("click", (e) => {
  const tbody = e.target as HTMLTableElement;
  const btn = tbody.closest("button");
  const isbn = btn?.dataset.isbn;
  console.log(`isbn: ${isbn}`);
  if (isbn) {
    addToFavorite(isbn);
    renderFav(favElt);
  }
});

//function
function renderBooks(books: Book[], option: RenderOption = "default") {
  if (option === "default") {
    const selectOptions = [
      ...new Set(books.map((book) => selectPublisherTemplate(book))),
    ]
      .concat(['<option value="-" selected>-</option>'])
      .join("");

    // console.log("selectOptions elemnt", selectOptions);
    const booksElt = books.map((book) => bookTemplate(book)).join("");

    selectElt.innerHTML = selectOptions;
    booksTableElt.innerHTML = booksElt;
  } else if (option === "table") {
    booksTableElt.textContent = "";
    const booksElt = books.map((book) => bookTemplate(book)).join("");
    booksTableElt.innerHTML = booksElt;
  }
  bookLengthEl.textContent = books.length.toString() + " Books displayed";
}
