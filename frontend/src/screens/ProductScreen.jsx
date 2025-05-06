import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Image, ListGroup, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addOrUpdateCart, fetchCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [mainImage, setMainImage] = useState("");

  const cartItems = useSelector((state) => state.cart.items);

  // Fetch product and cart data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
        setMainImage(data.mainImage);

        if (cartItems.length === 0) {
          await dispatch(fetchCart()).unwrap();
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, dispatch, cartItems.length]);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
    if (cartItems && Array.isArray(cartItems)) {
      const existingItem = cartItems.find(
        (item) => item.productId && item.productId._id === productId
      );
      if (existingItem) {
        setQty(existingItem.quantity);
      } else {
        setQty(1);
      }
    } else {
      setQty(1);
    }
  }, [cartItems, productId]);

  const handleAddToCart = async () => {
    try {
      await dispatch(addOrUpdateCart({ productId, quantity: qty })).unwrap();
      setSuccessMessage("Item added to cart successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setQty(1); // Reset quantity after adding to cart
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  // Increase and decrease quantity
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

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && (
        <Row>
          <Col md={5}>
            <Image src={mainImage} alt={product.name} fluid />

            {product.images?.length > 0 && (
              <Row className="mt-3">
                {product.images.map((img, index) => (
                  <Col xs={4} key={index}>
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fluid
                      thumbnail
                      className="small-thumbnail"
                      onClick={() => setMainImage(img)}
                      style={{
                        cursor: "pointer",
                        border:
                          mainImage === img ? "2px solid #007bff" : "none",
                      }}
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
                Status:{" "}
                <strong>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </strong>
              </ListGroup.Item>

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
      )}

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

      {product.specifications?.length > 0 && (
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
