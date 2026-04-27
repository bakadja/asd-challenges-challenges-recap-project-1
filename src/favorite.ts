import { renderFav, getBookByISBN, selectPublisherTemplate } from "./index";
import type { Book, RenderOption } from "./index";

const selectElt = document.getElementById("by-publisher") as HTMLSelectElement;
const favElt = document.getElementById("fav-elt") as HTMLSpanElement;
const booksTableElt = document.getElementById(
  "books-table-fav",
) as HTMLTableElement;
const table = document.querySelector("table") as HTMLTableElement;

const bookLengthEl = document.getElementById("book-length") as HTMLTitleElement;

const favBooks: Book[] = [];

renderFav(favElt);

const favoritesIsbn: string[] =
  JSON.parse(localStorage.getItem("favorites") as string) || [];

if (favoritesIsbn.length > 0) {
  try {
    const promisesBooks = favoritesIsbn.map((isbn: string) =>
      getBookByISBN(isbn),
    );
    const books = (await Promise.all(promisesBooks)).flat() as Book[];

    console.log("books [favorite]", books);
    if (books.length > 0) {
      table.style.display = "unset";
      favBooks.push(...books);
      renderBooks(books);
    }
  } catch (error) {
    console.error("Error fetching favorites", error);
  }
}

// add evente for delete a boo on favorite list
booksTableElt.addEventListener("click", (e) => {
  console.log("e", e);
  const tbody = e.target as HTMLTableElement;
  const btn = tbody.closest(".remove") as HTMLButtonElement;
  const isbn = btn?.dataset.isbn;
  console.log("isbn", isbn);
  if (isbn) {
    onDelete(isbn);
    renderFav(favElt);
  }
});

function renderBooks(books: Book[], option: RenderOption = "default") {
  if (option === "default") {
    const selectOptions = [
      ...new Set(books.map((book) => selectPublisherTemplate(book))),
    ]
      .concat(['<option value="-" selected>-</option>'])
      .join("");

    console.log("selectOptions elemnt", selectOptions);
    const booksElt = books.map((book) => bookTemplate(book)).join("");
    //console.log("booksElt", booksElt);

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

function onDelete(isbn: string) {
  const favorites: string[] = JSON.parse(
    localStorage.getItem("favorites") || `[]`,
  );
  if (
    favorites?.includes(isbn) &&
    confirm("do you want to delete this book?")
  ) {
    const restFav = favBooks.filter((book) => book.isbn !== isbn);
    const restIsbn = favorites.filter((is) => is !== isbn);
    console.log("restIsbn", restIsbn);
    localStorage.setItem("favorites", JSON.stringify(restIsbn));
    renderBooks(restFav);
  }
}

// template

export function bookTemplate(book: Book) {
  return `
              <tr>
                <td>
                  <button data-isbn="${book.isbn}" title="love icon" class="button button-clear fav-btn">
                
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#9b4dca"
                      class="fav"
                    >
                      <path
                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                      />
                    </svg>
                  </button>
                </td>
                <td>${book.title}</td>
                <td>${book.isbn}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>
                  <button data-id=${book.id} class="button" onclick="location.href='detail?q=${book.isbn}'">
                    Detail
                  </button>
                  <button data-isbn=${book.id} class="button remove">
                    Remove
                  </button>
                </td>
                </tr>
                `;
}
