import {
  renderFav,
  getBookByISBN,
  selectPublisherTemplate,
  bookTemplate,
} from "./index";
import type { Book, RenderOption } from "./index";

const selectElt = document.getElementById("by-publisher") as HTMLSelectElement;
const favElt = document.getElementById("fav-elt") as HTMLSpanElement;
const booksTableElt = document.getElementById(
  "books-table",
) as HTMLTableElement;
const table = document.querySelector("table") as HTMLTableElement;

const bookLengthEl = document.getElementById("book-length") as HTMLTitleElement;

renderFav(favElt);

const favoritesIsbn =
  JSON.parse(localStorage.getItem("favorites") as string) || [];

if (favoritesIsbn.length > 0) {
  try {
    const promisesBooks = favoritesIsbn.map((isbn: string) =>
      getBookByISBN(isbn),
    );
    const books = (await Promise.all(promisesBooks)).flat() as Book[];

    console.log("books [favorite]", books.flat());
    if (books.length > 0) {
      table.style.display = "unset";
      renderBooks(books);
      renderIcons();
    }
  } catch (error) {
    console.error("Error fetching favorites");
  }
}

function renderBooks(books: Book[], option: RenderOption = "default") {
  if (option === "default") {
    const selectOptions = [
      ...new Set(books.map((book) => selectPublisherTemplate(book))),
    ]
      .concat(['<option value="-" selected>-</option>'])
      .join("");

    console.log("selectOptions elemnt", selectOptions);
    const booksElt = books.map((book) => bookTemplate(book)).join("");
    console.log("booksElt", booksElt);

    selectElt.innerHTML = selectOptions;
    booksTableElt.innerHTML = booksElt;
  } else if (option === "table") {
    booksTableElt.textContent = "";
    const booksElt = books.map((book) => bookTemplate(book)).join("");
    booksTableElt.innerHTML = booksElt;
  }
  bookLengthEl.textContent =
    books.length.toString() + " Favorites on your list";
}

// render Love 🏒

function renderIcons() {
  const svgElt = document.querySelectorAll("svg") as NodeListOf<SVGSVGElement>;
  svgElt.forEach((svg) => {
    svg.style.fill = "#9b4dca";
  });
}
