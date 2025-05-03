import { Row, Col } from "react-bootstrap";
import products from "../data";
import Product from "../components/Product";

const HomeScreen = () => {
  return (
    <>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default HomeScreen;
