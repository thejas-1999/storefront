// src/components/Pagination.js
import { Button } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate an array of page numbers (1, 2, 3, ..., totalPages)
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination-controls">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {/* Render page numbers */}
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          active={number === currentPage}
        >
          {number}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
