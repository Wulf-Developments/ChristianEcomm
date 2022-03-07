import React from "react";
import { Nav, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./AdminNav.css";

const AdminNav = () => {
  return (
    <Row className="admin-nav-container hide-sm">
      <LinkContainer to="/admin/userlist">
        <Nav.Link>Users</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/admin/orderlist">
        <Nav.Link>Orders</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/admin/productlist">
        <Nav.Link>Products</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/admin/categories">
        <Nav.Link>Categories</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/admin/admin-panel">
        <Nav.Link>Panel</Nav.Link>
      </LinkContainer>
    </Row>
  );
};

export default AdminNav;
