import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import BookShelf from "./BookShelf";
import SearchBook from "./SearchBook";
import * as BookAPIS from "../apis/BooksAPI";
import "../css/App.css";

function App() {
  const [booksData, setBooksData] = useState([]);

  /**
   * @description call API to fetch books
   */
  const fetchBook = async () => {
    const res = await BookAPIS.getAll();

    setBooksData(res);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  /**
   * @description update selected book
   * @param {object} book
   * @param {string} shelfName
   */
  const onUpdateShelf = (book, shelfName) => {
    const updateBook = async (book, shelfName) => {
      const res = await BookAPIS.update(book, shelfName);
      if (res) {
        fetchBook();
      }
    };
    updateBook(book, shelfName);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <BookShelf
              bookData={booksData}
              updateShelf={(book, ShelfName) => {
                onUpdateShelf(book, ShelfName);
              }}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchBook
              currentBooks={booksData}
              notifyUpdate={(book, ShelfName) => {
                onUpdateShelf(book, ShelfName);
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
