export type Book = {
  id: string;
  title: string;
  subtitle: string;
  isbn: string;
  abstract: string;
  author: string;
  publisher: string;
  price: string;
  numPages: number;
  cover: string;
  userId: number;
};

export type RenderOption = "default" | "table";
//URL
const baseURL = "http://localhost:4730/";

// const books = await getBooks(baseURL)
// console.log("books", books)

export async function getBooks(): Promise<Book[]> {
  const table = document.querySelector("table") as HTMLTableElement;
  const loadingZone = document.getElementById("loading-zone") as HTMLDivElement;

  try {
    const res = await fetch(baseURL + "books");
    if (!res.ok) {
      throw new Error(`StatusCode: ${res.status}`);
    }
    const books = (await res.json()) as Book[];
    //throw new Error("test error handling");
    if (loadingZone) {
      loadingZone.style.display = "none";
      table.style.display = "unset";
    }

    return books.slice(0, 20);
  } catch (error) {
    console.error("Error during fetching books", error);
    if (loadingZone) {
      table.style.display = "none";
      loadingZone.innerHTML = `
    <p class="error">Error during fetching data, please try again later or reload the page</p>
    `;
    }
    return [];
  }
}

// search by title
export function searchByTitle<T>(search: string, books: Book[]): Book[] {
  return books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()),
  );
}
// const webBooks = searchByTitle("java")
// console.log("webBooks", webBooks)

// filer by publisher
export function filterByPublisher(publisher: string, books: Book[]): Book[] {
  return books.filter((book) =>
    book.publisher.toLowerCase().split(", ").includes(publisher.toLowerCase()),
  );
}

// find by ISBN
export async function getBookByISBN(isbn: string): Promise<Book[]> {
  console.log("isbn [getBookByISBN]", isbn);
  try {
    const res = await fetch(baseURL + "books" + "/" + isbn);
    if (!res.ok) {
      throw new Error(`StatusCode: ${res.status}`);
    }
    const book = [await res.json()] as Book[];
    return book;
  } catch (error) {
    (document.getElementById("book-detail") as HTMLElement).innerHTML = `
    <p class="error">Error during fetching data, please try again later or reload the page</p>
    `;
    return [];
  }
}

//const foundBooks = filterByPublisher("O'Reilly Media")
//console.log("foundBooks",foundBooks)

// add book to favorite
export function addToFavorite(isbn: string) {
  const favoritesIsbn =
    JSON.parse(localStorage.getItem("favorites") as string) || [];

  if (!favoritesIsbn.includes(isbn)) {
    favoritesIsbn.push(isbn);
  }

  localStorage.setItem("favorites", JSON.stringify(favoritesIsbn));
}

// template
export const bookTemplate = (book: Book) => `
              <tr>
                <td>
                  <button data-isbn="${book.isbn}" title="love icon" class="button button-clear fav-btn">
                
                    <svg
                      onclick="this.style.fill='#9b4dca'"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
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
                </td>
                </tr>
                `;

// <a href="src/detail.html">Detail</a>
export const selectPublisherTemplate = (book: Book) => `
      <option value="${book.publisher.toLowerCase()}">${book.publisher}</option>
      `;

export const bookDetailPageTemplate = (book: Book) => `
      <h1>
        ${book.title}}<br />
        <small>${book.subtitle}</small>
      </h1>
      <section class="row">
        <div class="column column-67">
          <h3>Abstract</h3>
          <p>
            ${book.abstract}}
          </p>

          <h4>Details</h4>
          <ul>
            <li><strong>Author:</strong> ${book.author}</li>
            <li><strong>Publisher:</strong> ${book.publisher}</li>
            <li><strong>Pages:</strong> ${book.numPages}</li>
          </ul>

          <button
            class="button button-outline"
            onclick="location.href='/'"
          >
            Back
          </button>
        </div>
        <div class="column column-33">
          <img src=${book.cover} alt="" />
        </div>
      </section>
      `;

// render fav
export function renderFav(span: HTMLSpanElement) {
  const favoritesIsbn =
    JSON.parse(localStorage.getItem("favorites") as string) || [];
  if (favoritesIsbn) {
    span.textContent = favoritesIsbn.length.toString();
  }
}
