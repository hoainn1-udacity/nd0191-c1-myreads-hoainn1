import { useRef } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import Header from "./BookDisplay/Header";
import BookList from "./BookDisplay/BookList";
import "../css/App.css";

export const ShelfName = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want to Read",
  read: "Read",
};

const BookShelf = ({ bookData, updateShelf }) => {
  const shelfType = useRef(["currentlyReading", "wantToRead", "read"]);

  /**
   * @description update selected book
   * @param {object} book
   * @param {string} shelfName
   */
  const onBookUpdate = (book, shelfName) => {
    if (updateShelf) {
      updateShelf(book, shelfName);
    }
  };

  /**
   * @description filter books by shelfName
   * @param {string} shelfName
   * @returns books by specific shelfName
   */
  const BookByShelf = (shelfName) => {
    return bookData.filter((book) => book.shelf === shelfName);
  };

  return (
    <div className="list-books">
      <Header />
      {shelfType.current.map((type) => {
        return (
          <div key={type} className="list-books-content">
            <div className="bookshelf">
              <h2 className="bookshelf-title">{ShelfName[type]}</h2>
              <div className="bookshelf-books">
                <BookList
                  books={BookByShelf(type)}
                  bookUpdate={(book, shelfName) =>
                    onBookUpdate(book, shelfName)
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className="open-search">
        {<Link to="/add-book" />}
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  bookData: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default BookShelf;
