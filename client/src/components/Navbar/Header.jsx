import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import AdminNav from "../Admin/AdminNav";
import SearchBox from "../SearchBox";
import ProductNavigation from "../Product/ProductNavigation";
import { getLogo } from "../../actions/Admin/Logo/getLogo";
import { useMediaQuery } from "react-responsive";

// css
import "./index.css";

const Header = () => {
  const dispatch = useDispatch();
  //Should return false if the screen is less than the specified screen size
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const { logo } = useSelector((state) => state.dynamic);

  const logoutHandler = () => {
    dispatch(logout());
  };
  useEffect(() => {
    dispatch(getLogo());
  }, [dispatch]);

  return (
    <header>
      <Navbar
        expand="lg"
        variant="dark"
        collapseOnSelect
        className="primary-bg"
      >
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span>
                <Image src={logo.value} style={{ height: "80px" }} fluid />
              </span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ justifyContent: "space-evenly" }}
          >
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto nav-items">
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
              <div className="text-end">
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
                {!isMobile && userInfo && userInfo.isAdmin ? (
                  <>
                    <LinkContainer to="/admin/admin-panel/logo">
                      <Nav.Link>
                        <span>
                          <i class="fa-solid fa-display" /> Admin Panel
                        </span>
                      </Nav.Link>
                    </LinkContainer>
                  </>
                ) : (
                  <>
                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown title="Admin" id="adminmenu">
                        <LinkContainer to="/admin/admin-panel/users">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/admin-panel/products">
                          <NavDropdown.Item>Product</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/admin-panel/orders">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/admin-panel/reports">
                          <NavDropdown.Item>Reports</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/admin-panel">
                          <NavDropdown.Item>Panel</NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )}
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Nav style={{ width: "100vw" }}>
        {userInfo && userInfo.isAdmin && <AdminNav />}
        <ProductNavigation />
      </Nav>
    </header>
  );
};

export default Header;
