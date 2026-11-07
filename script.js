
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Toggle a book's read status
Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

// Add a new book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  displayBooks();
}

// Remove a book using its unique ID
function removeBook(bookId) {
  const bookIndex = myLibrary.findIndex(
    (book) => book.id === bookId
  );

  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  }
}

// Create a book card
function createBookCard(book) {
  const card = document.createElement("article");
  card.classList.add("book-card");
  card.dataset.id = book.id;

  const title = document.createElement("h3");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.classList.add("book-author");
  author.textContent = `By ${book.author}`;

  const pages = document.createElement("p");
  pages.classList.add("book-pages");
  pages.textContent = `${book.pages} pages`;

  const status = document.createElement("p");
  status.classList.add("book-status");
  status.textContent = book.read ? "Read" : "Not read yet";

  const actions = document.createElement("div");
  actions.classList.add("book-actions");

  const toggleButton = document.createElement("button");
  toggleButton.classList.add("toggle-read-btn");
  toggleButton.type = "button";
  toggleButton.textContent = book.read ? "Mark unread" : "Mark read";
  toggleButton.dataset.action = "toggle";

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-book-btn");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.dataset.action = "remove";

  actions.append(toggleButton, removeButton);

  card.append(title, author, pages, status, actions);

  return card;
}

// Display all books in the library
function displayBooks() {
  const bookGrid = document.querySelector("#book-grid");
  const bookCount = document.querySelector("#book-count");

  bookGrid.replaceChildren();

  bookCount.textContent =
    `${myLibrary.length} ${myLibrary.length === 1 ? "book" : "books"}`;

  if (myLibrary.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "Your library is empty. Add your first book!";

    bookGrid.appendChild(emptyMessage);
    return;
  }

  myLibrary.forEach((book) => {
    const bookCard = createBookCard(book);
    bookGrid.appendChild(bookCard);
  });
}

// Handle book actions using event delegation
const bookGrid = document.querySelector("#book-grid");

bookGrid.addEventListener("click", (event) => {
  const actionButton = event.target.closest("button[data-action]");

  if (!actionButton) return;

  const bookCard = actionButton.closest(".book-card");
  const bookId = bookCard.dataset.id;

  const book = myLibrary.find(
    (item) => item.id === bookId
  );

  if (!book) return;

  if (actionButton.dataset.action === "remove") {
    removeBook(bookId);
  }

  if (actionButton.dataset.action === "toggle") {
    book.toggleReadStatus();
    displayBooks();
  }
});

// Dialog elements
const bookDialog = document.querySelector("#book-dialog");
const openDialogButton = document.querySelector("#open-dialog");
const closeDialogButton = document.querySelector("#close-dialog");
const bookForm = document.querySelector("#book-form");

// Open the form
openDialogButton.addEventListener("click", () => {
  bookDialog.showModal();
});

// Close the form
closeDialogButton.addEventListener("click", () => {
  bookDialog.close();
});

// Close dialog when clicking outside its content
bookDialog.addEventListener("click", (event) => {
  if (event.target === bookDialog) {
    bookDialog.close();
  }
});

// Handle form submission
bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const pages = Number(document.querySelector("#pages").value);
  const read = document.querySelector("#read").checked;

  if (!title || !author || !Number.isInteger(pages) || pages < 1) {
    return;
  }

  addBookToLibrary(title, author, pages, read);

  bookForm.reset();
  bookDialog.close();
});

// Initial books
addBookToLibrary(
  "The Hobbit",
  "J.R.R. Tolkien",
  310,
  true
);

addBookToLibrary(
  "Atomic Habits",
  "James Clear",
  320,
  false
);

addBookToLibrary(
  "The Psychology of Money",
  "Morgan Housel",
  256,
  true
);
