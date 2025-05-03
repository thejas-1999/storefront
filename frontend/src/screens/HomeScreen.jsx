import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(3);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/products", {
          params: { sort: sortOption, page: currentPage, limit },
        });
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortOption, currentPage, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {/* Sorting Dropdown */}
      <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />

      {/* Loading state */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Render products only if available */}
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <div>No products available</div>
            )}
          </Row>

          {/* Pagination Controls */}
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
