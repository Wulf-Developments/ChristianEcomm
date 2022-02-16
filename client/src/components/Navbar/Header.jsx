import React from "react";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import SearchBox from "../SearchBox";

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        expand="lg"
        variant="dark"
        collapseOnSelect
        style={{ backgroundColor: "rgb(99,129,124)" }}
      >
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span className="darkslategray-txt">
                <Image
                  src="/images/ChristianEcommLogo.png"
                  style={{ height: "80px" }}
                />
              </span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <span className="">
                    <i className="fas fa-shopping-cart" /> Cart{" "}
                    {cartItems.length > 0 && (
                      <p style={{ display: "inline" }}>
                        ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      </p>
                    )}
                  </span>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  className="dimgray-txt"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <span>Profile</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign-In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Product</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
