import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../slices/cartSlice";

const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand>Online Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <FaShoppingCart /> Cart
                {totalQuantity > 0 && (
                  <Badge bg="danger" className="ms-2">
                    {totalQuantity}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
