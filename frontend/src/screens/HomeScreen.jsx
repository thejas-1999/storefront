import { Row, Col } from "react-bootstrap";
import products from "../data";

const HomeScreen = () => {
  return (
    <>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            {product.name}
          </Col>
        ))}
      </Row>
    </>
  );
};
export default HomeScreen;
