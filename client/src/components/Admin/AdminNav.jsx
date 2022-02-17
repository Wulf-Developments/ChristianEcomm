import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <Container fluid>
      <Row style={{ textAlign: "center", margin: "0 0 5%" }}>
        <Col>
          <LinkContainer to="/admin/userlist">
            <Button variant="light">Users</Button>
          </LinkContainer>
        </Col>
        <Col>
          <LinkContainer to="/admin/orderlist">
            <Button variant="light">Orders</Button>
          </LinkContainer>
        </Col>
        <Col>
          <LinkContainer to="/admin/productlist">
            <Button variant="light">Products</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminNav;
