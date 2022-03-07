import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserListTable from "../../components/Admin/UserListTable";
import LogoEdit from "../../components/Forms/LogoEdit";
import "./AdminScreen.css";

const AdminScreen = ({ match, history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const view = match.params.view || "";
  // pulls the pageNumber and Keyword search params
  // careful with these param values, since this is a component
  // placed inside of a component and not a route, it doesnt have
  // match, it must be passed into it.
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;
  console.log(match);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/");
    }
  }, [userInfo, history]);

  return (
    <Row style={{ height: "100%", position: "relative" }}>
      <Col lg={2} md={3}>
        <ListGroup>
          <Link to="/admin/admin-panel/logo">
            <ListGroup.Item className="rounded">Logo</ListGroup.Item>
          </Link>
          <Link to="/admin/admin-panel/users">
            <ListGroup.Item className="rounded">Users</ListGroup.Item>
          </Link>
          <Link to="">
            <ListGroup.Item className="rounded">Orders</ListGroup.Item>
          </Link>
          <Link to="">
            <ListGroup.Item className="rounded">Products</ListGroup.Item>
          </Link>
          <Link to="">
            <ListGroup.Item className="rounded">Categories</ListGroup.Item>
          </Link>
        </ListGroup>
      </Col>
      <Col className="background-bg admin-panel-right-col">
        {view === "users" && (
          <UserListTable
            keyword={keyword}
            pageNumber={pageNumber}
            history={history}
          />
        )}
        {view === "logo" && <LogoEdit />}
      </Col>
    </Row>
  );
};

export default AdminScreen;
