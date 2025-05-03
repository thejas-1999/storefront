import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Button,
  Alert, // Import Alert component for success message
} from "react-bootstrap";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1); // Default quantity to 1
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await axios.post("/api/cart", { productId, quantity: qty });
      setSuccessMessage("Item added to cart successfully!"); // Set success message
      setTimeout(() => setSuccessMessage(""), 3000); // Clear the message after 3 seconds

      setQty(1);
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  const increaseQuantity = () => {
    if (qty < product.countInStock) {
      setQty(qty + 1);
    }
  };

  const decreaseQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Back
      </Link>

      {/* Success Message */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Row>
        <Col md={5}>
          <Image src={product.mainImage} alt={product.name} fluid />

          {/* Thumbnails */}
          {product.images && product.images.length > 0 && (
            <Row className="mt-3">
              {product.images.map((img, index) => (
                <Col xs={4} key={index}>
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fluid
                    thumbnail
                    className="small-thumbnail"
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{product._id}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price: ₹{product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Status:
              <strong>
                {product.countInStock > 0 ? " In Stock" : " Out of Stock"}
              </strong>
            </ListGroup.Item>

            {/* Quantity selector */}
            <ListGroup.Item>
              <div>
                <Button
                  variant="outline-secondary"
                  onClick={decreaseQuantity}
                  disabled={qty <= 1}
                >
                  -
                </Button>
                <span className="mx-3">{qty}</span>
                <Button
                  variant="outline-secondary"
                  onClick={increaseQuantity}
                  disabled={qty >= product.countInStock}
                >
                  +
                </Button>
              </div>
            </ListGroup.Item>

            {/* Add to Cart Button */}
            <ListGroup.Item>
              <Button
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      {/* Description */}
      <Row className="mt-5">
        <Col md={9}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Description</h3>
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      {/* Specification */}
      {product.specifications && product.specifications.length > 0 && (
        <Row className="mt-4">
          <Col md={9}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Specifications</h3>
              </ListGroup.Item>
              {product.specifications.map((spec, index) => (
                <ListGroup.Item key={index}>
                  <strong>{spec.label}: </strong>
                  {spec.value}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
