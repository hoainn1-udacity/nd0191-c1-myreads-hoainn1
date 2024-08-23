import { PropTypes } from "prop-types";
import "../../css/BookDisplay.css";

const Authors = ({ authors }) => {
  if (!authors) {
    return <div className="book-authors">None Authors</div>;
  }

  return authors.map((author) => {
    return (
      <div key={author} className="book-authors">
        {author}
      </div>
    );
  });
};

Authors.propTypes = {
  authors: PropTypes.array,
};

export default Authors;
