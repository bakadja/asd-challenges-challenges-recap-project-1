import { bookDetailPageTemplate, getBookByISBN } from "./index";
import type { Book } from "./index";

// Add detail page
const bookDetailEl = document.getElementById("book-detail") as HTMLElement;

const queryString = window.location.search;
const params = new URLSearchParams(queryString);

const isbn = params.get("q");
if (params.has("q") && isbn) {
  console.log("id [detail page]", isbn);

  const found = (await getBookByISBN(isbn))[0];
  console.log("found", found);
  found && renderBookDetail(found);
}

function renderBookDetail(book: Book) {
  bookDetailEl.innerHTML = bookDetailPageTemplate(book);
}
