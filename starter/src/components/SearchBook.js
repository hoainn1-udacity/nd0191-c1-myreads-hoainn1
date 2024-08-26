import { useState, useRef, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import BookList from "./BookDisplay/BookList";
import * as BookAPIS from "../apis/BooksAPI";
import "../css/App.css";

const SearchBook = ({ notifyUpdate, currentBooks }) => {
  const max = useRef(20);
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
    if (notifyUpdate) {
      notifyUpdate(book, shelfName);
    }
  };

  /**
   * @description map and update correct search data
   * @param {array} searchData
   */
  const updateSearchStatus = (searchData) => {
    if (!searchData) {
      return [];
    }
    const updatedSearchData = searchData.map((result) => {
      const currentBookOnShelf = currentBooks?.filter(
        (book) => result?.id === book?.id
      );

      if (currentBookOnShelf.length !== 0) {
        result.shelf = currentBookOnShelf[0].shelf;
      }
      return result;
    });
    return updatedSearchData;
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
            books={updateSearchStatus(searchData)}
            bookUpdate={(book, shelfName) => onBookUpdate(book, shelfName)}
          />
        )}
      </div>
    </div>
  );
};

SearchBook.propTypes = {
  notifyUpdate: PropTypes.func.isRequired,
  currentBooks: PropTypes.array.isRequired,
};

export default SearchBook;
