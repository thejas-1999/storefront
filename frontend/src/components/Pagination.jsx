import { Button } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination-controls d-flex justify-content-center gap-2 mt-4 flex-wrap">
      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={number === currentPage ? "primary" : "outline-primary"}
          onClick={() => onPageChange(number)}
          className="mx-1"
        >
          {number}
        </Button>
      ))}

      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
