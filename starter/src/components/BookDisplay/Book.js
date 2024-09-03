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
          {/* Here should handle selected value when search result are set */}
          {/*  and when i'm checked all book not in main page is selected with */}
          {/*  "none" option */}
          <select
            onChange={(e) => handleChangeShelf(e)}
            defaultValue={book?.shelf ? book.shelf.toString() : "none"}
          >
            <option value="none" disabled>
              None
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
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
