import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Back
      </Link>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.mainImage} alt={product.name} fluid />
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
                <ListGroup.Item>
                  This place is for add decrease products
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
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
      )}
    </>
  );
};

export default ProductScreen;
