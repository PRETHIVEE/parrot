import React from "react";
import _ from "lodash"; // JS lib // UnderScore

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize); // pages count will be like 2.2, 1.2 with out math.ceil
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); // lodash underscore returns array like [1 2 3.. pages]

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
