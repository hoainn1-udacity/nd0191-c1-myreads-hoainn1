import { useState, useRef, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import BookList from "./BookDisplay/BookList";
import * as BookAPIS from "../apis/BooksAPI";
import "../css/App.css";

const SearchBook = ({ updateShelf }) => {
  const max = useRef(50);
  const [searchString, setSearchString] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (searchString) {
      search(searchString, max.current);
    }

    return () => {
      setSearchData([]);
    };
  }, [searchString]);

  /**
   * @description call search api by query input
   * @param {string} query
   * @param {number} maxResults
   * @returns search result
   */
  const search = async (query, maxResults) => {
    const res = await BookAPIS.search(query, maxResults);
    if (res?.error) {
      setSearchData([]);
      return;
    }
    setSearchData(res);
  };

  /**
   * @description delay search input to prevent call too much api
   * @param {string} value
   */
  const debounced = useDebouncedCallback((value) => {
    setSearchString(value);
  }, 300);

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

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={(e) => debounced(e.target.value)}
            placeholder="Search by title, author, or ISBN"
            autoFocus
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchData && (
          <BookList
            books={searchData}
            bookUpdate={(book, shelfName) => onBookUpdate(book, shelfName)}
          />
        )}
      </div>
    </div>
  );
};

SearchBook.propTypes = {
  updateShelf: PropTypes.func.isRequired,
};

export default SearchBook;
