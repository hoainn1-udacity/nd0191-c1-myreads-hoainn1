# MyReads Project

This is the final assessment project for Udacity's course 2: React Fundamentals.

## Author

HoaiNN1

## Installing
To get started developing right away, please follow these steps:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## Project sturture

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── apis
    │   └── BooksAPI.js # A JavaScript API for the provided Udacity backend.
    ├── components
    │   ├── Bookdisplay
    │   │   ├── Authors.js # Component to render list author of a book.
    │   │   ├── Book.js # Component to render book.
    │   │   ├── BookList.js # Component to render list book.
    │   │   └── Header.js # Component to render Header
    │   ├── App.js # This is the root of MyReads app.
    │   ├── BookShelf.js # This is for render the book shelf page.
    │   └── SearchBook.js # This is for render the search book page.
    ├── css
    │   ├── App.css # Styles for MyReads app.
    │   ├── BookDisplay.css # Style for book shelf page.
    │   └── index.css # Global styles.
    ├── icons # Helpful images for MyReads app.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── images # Also helpful image but contain png file for default book cover.
    │   └── EmptyLinkCover.png
    └── index.js # It is used for DOM rendering only.
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.
