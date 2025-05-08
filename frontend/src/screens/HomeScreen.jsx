import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";
import { fetchProducts } from "../slices/productSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { products, status, totalPages, error } = useSelector(
    (state) => state.product
  );

  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ sort: sortOption, page: currentPage, limit: 3 }));
  }, [dispatch, sortOption, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <SortDropdown onSortChange={setSortOption} />

      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "failed" ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  key={product._id}
                  className="product-col"
                >
                  <div className="product-card">
                    <Product product={product} />
                  </div>
                </Col>
              ))
            ) : (
              <div>No products available</div>
            )}
          </Row>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
