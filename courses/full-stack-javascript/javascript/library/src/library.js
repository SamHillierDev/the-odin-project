document.addEventListener("DOMContentLoaded", () => {
  const myLibrary = [];

  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }

    toggleRead() {
      this.read = !this.read;
    }
  }

  function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
  }

  function displayBooks() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    const libraryContainer = document.getElementById("library");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
      const bookCard = document.createElement("div");
      bookCard.dataset.index = index;

      bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: <span>${book.read ? "Read" : "Not Read"}</span></p>
        <button>Toggle Read</button>
        <button>Remove</button>
      `;

      libraryContainer.appendChild(bookCard);
    });

    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll(".toggle-read").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.parentElement.dataset.index;
        myLibrary[index].toggleRead();
        displayBooks();
      });
    });

    document.querySelectorAll(".remove-book").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.parentElement.dataset.index;
        myLibrary.splice(index, 1);
        displayBooks();
      });
    });
  }

  document
    .getElementById("book-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const pages = parseInt(document.getElementById("pages").value, 10);
      const read = document.getElementById("read").checked;

      addBookToLibrary(title, author, pages, read);
      this.reset();
    });

  document.getElementById("new-book-btn").addEventListener("click", () => {
    const form = document.getElementById("book-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
  });

  function loadLibraryFromStorage() {
    const savedLibrary = localStorage.getItem("library");
    if (savedLibrary) {
      const parsedLibrary = JSON.parse(savedLibrary);
      parsedLibrary.forEach((bookData) => {
        myLibrary.push(
          new Book(
            bookData.title,
            bookData.author,
            bookData.pages,
            bookData.read
          )
        );
      });
      displayBooks();
    }
  }

  loadLibraryFromStorage();
});
