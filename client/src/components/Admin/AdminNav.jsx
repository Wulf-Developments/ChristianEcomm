import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AdminNav = () => {
  return (
    <Container fluid>
      <Row style={{ textAlign: "center", margin: "0 0 2%" }}>
        <Col style={{ padding: "2% 0" }}>
          <LinkContainer to="/admin/userlist">
            <Button variant="light">Users</Button>
          </LinkContainer>
        </Col>
        <Col style={{ padding: "2% 0" }}>
          <LinkContainer to="/admin/orderlist">
            <Button variant="light">Orders</Button>
          </LinkContainer>
        </Col>
        <Col style={{ padding: "2% 0" }}>
          <LinkContainer to="/admin/productlist">
            <Button variant="light">Products</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminNav;
