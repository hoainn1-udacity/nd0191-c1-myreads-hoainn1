import { PropTypes } from "prop-types";
import Book from "./Book";
import "../../css/BookDisplay.css";

const BookList = ({ books, bookUpdate }) => {

  /**
   * @description update selected book
   * @param {object} book
   * @param {string} shelfName
   */
  const onBookUpdate = (book, shelfName) => {
    if (bookUpdate) {
      bookUpdate(book, shelfName);
    }
  };

  return (
    <ol className="books-grid">
      {books?.length !== 0 &&
        books.map((book) => {
          return (
            <li key={book.id}>
              <Book
                book={book}
                shelfChange={(book, shelfName) => onBookUpdate(book, shelfName)}
              />
            </li>
          );
        })}
    </ol>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  bookUpdate: PropTypes.func.isRequired,
};

export default BookList;
