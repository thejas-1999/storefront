import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img
          src={product.mainImage}
          variant="top"
          style={{ height: "200px", objectFit: "cover" }}
        />
      </a>
      <Card.Body>
        <Card.Text as="p">{product._id}</Card.Text>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="h3">{product.price}₹</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
