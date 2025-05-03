// src/screens/HomeScreen.js
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import SortDropdown from "../components/SortDropdown";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState(""); // Sorting state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/products", {
          params: { sort: sortOption }, // Passing the sort option to the API
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortOption]); // Re-fetch products when sortOption changes

  return (
    <>
      {/* Sorting Dropdown */}
      <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />

      {/* Loading state */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
