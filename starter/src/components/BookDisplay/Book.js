import { PropTypes } from "prop-types";
import Authors from "./Authors";
import "../../css/BookDisplay.css";

const Book = ({ book, shelfChange }) => {

  /**
   * @description set the select value to function
   * @param {*} e
   */
  const handleChangeShelf = (e) => {
    e.preventDefault();

    if (shelfChange) {
      shelfChange(book, e.target.value);
    }
  };

  /**
   * @description determine the image cover link
   * @returns image cover link
   */
  const imageLink = () => {
    const link = book?.imageLinks?.thumbnail;

    return link ? `url("${link}")` : `url("../../images/EmptyLinkCover.png")`;
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: imageLink(),
          }}
        />
        <div className="book-shelf-changer">
          <select
            onChange={(e) => handleChangeShelf(e)}
            value={book?.shelf ? book.shelf.toString() : "none"}
          >
            <option value="addTo" disabled>
              Add to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book?.title}</div>
      <Authors authors={book?.authors} />
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelfChange: PropTypes.func.isRequired,
};

export default Book;
