import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserListTable from "../../components/Admin/UserListTable";
import OrderListScreen from "./OrderListScreen";
import ProductListScreen from "./ProductListScreen";
import CategoriesList from "./CategoriesList";
import LogoEdit from "../../components/Forms/LogoEdit";
import "./AdminScreen.css";
import Reports from "../../components/Admin/Reports";

const AdminScreen = ({ match, history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const view = match.params.view || "";
  // pulls the pageNumber and Keyword search params
  // careful with these param values, since this is a component
  // placed inside of a component and not a route, it doesnt have
  // match, it must be passed into it.
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/");
    }
  }, [userInfo, history]);

  return (
    <Row style={{ justifyContent: "space-evenly" }}>
      <Col lg={2} md={3} className="hide-sm">
        <ListGroup>
          <Link to="/admin/admin-panel/logo">
            <ListGroup.Item className="rounded" active={view === "logo"}>
              Logo
            </ListGroup.Item>
          </Link>
          <Link to="/admin/admin-panel/users">
            <ListGroup.Item className="rounded" active={view === "users"}>
              Users
            </ListGroup.Item>
          </Link>
          <Link to="/admin/admin-panel/orders">
            <ListGroup.Item className="rounded" active={view === "orders"}>
              Orders
            </ListGroup.Item>
          </Link>
          <Link to="/admin/admin-panel/products">
            <ListGroup.Item className="rounded" active={view === "products"}>
              Products
            </ListGroup.Item>
          </Link>
          <Link to="/admin/admin-panel/categories">
            <ListGroup.Item className="rounded" active={view === "categories"}>
              Categories
            </ListGroup.Item>
          </Link>
          <Link to="/admin/admin-panel/reports">
            <ListGroup.Item className="rounded" active={view === "reports"}>
              Reports
            </ListGroup.Item>
          </Link>
        </ListGroup>
      </Col>
      <Col
        className="background-bg admin-panel-right-col"
        lg={9}
        md={8}
        sm={12}
      >
        {view === "users" && (
          <UserListTable
            keyword={keyword}
            pageNumber={pageNumber}
            history={history}
          />
        )}
        {view === "logo" && <LogoEdit history={history} />}
        {view === "orders" && (
          <OrderListScreen
            keyword={keyword}
            pageNumber={pageNumber}
            history={history}
          />
        )}
        {view === "products" && (
          <ProductListScreen
            keyword={keyword}
            pageNumber={pageNumber}
            history={history}
          />
        )}
        {view === "categories" && (
          <CategoriesList
            keyword={keyword}
            pageNumber={pageNumber}
            history={history}
          />
        )}
        {view === "reports" && <Reports />}
      </Col>
    </Row>
  );
};

export default AdminScreen;
