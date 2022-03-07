import React from "react";
import { Nav, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./AdminNav.css";

const AdminNav = ({ location }) => {
  return (
    <Row className="admin-nav-container hide-lg">
      <LinkContainer to="/admin/admin-panel/users">
        <Nav.Link>Users</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/admin/admin-panel/orders">
        <Nav.Link>Orders</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/admin/admin-panel/products">
        <Nav.Link
        >
          Products
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/admin/admin-panel/categories">
        <Nav.Link
        >
          Categories
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/admin/admin-panel/reports">
        <Nav.Link>Reports</Nav.Link>
      </LinkContainer>
    </Row>
  );
};

export default AdminNav;
