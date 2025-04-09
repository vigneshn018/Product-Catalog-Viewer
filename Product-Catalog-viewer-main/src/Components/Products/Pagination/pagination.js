import React, { useState } from "react";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? "page-link active" : "page-link"}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
