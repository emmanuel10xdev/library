
# Library

A simple library application built with HTML, CSS, and JavaScript.

Users can add books, view their collection, remove books, and update their reading status.

## Features

- Add new books with a title, author, and page count.
- Track whether a book has been read.
- Change a book's reading status.
- Remove books from the library.
- Generate unique IDs for every book.
- Display the total number of books in the collection.

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)

## Project Structure

```text
library/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Open the project folder.

3. Open `index.html` in your browser.

No additional dependencies or installations are required.

## How It Works

- Book objects are created using the `Book` constructor.
- All books are stored in the `myLibrary` array.
- Each book receives a unique ID using `crypto.randomUUID()`.
- The `displayBooks()` function renders the library on the page.
- Books can be removed using their unique IDs.
- The `toggleReadStatus()` prototype method updates a book's reading status.
- The application uses event delegation to handle book actions.

## Future Improvements

- Save books using localStorage.
- Add book search and filtering.
- Allow users to edit existing books.

## Author

Built as part of The Odin Project JavaScript curriculum.
