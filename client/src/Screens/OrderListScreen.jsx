import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Pagination,
  Row,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import Meta from "../components/Meta";

const OrderListScreen = ({ history, match, location }) => {
  const dispatch = useDispatch();
  // const { pageNumber = 1, keyword = "" } = useParams();
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;

  const { loading, error, orders, pages, page } = useSelector(
    (state) => state.orderList
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const [search, setSearch] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(`/admin/orderlist/keyword/${search}/page/1`);
    } else {
      history.push("/admin/orderlist");
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders(keyword, pageNumber));
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, pageNumber, keyword]);

  return (
    <>
      <Meta title={`Orders | Page ${pageNumber}`} />
      <h1>Orders</h1>
      <Form onSubmit={submitHandler} style={{ padding: "2%" }}>
        <InputGroup>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Users"
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
          <Button type="submit" variant="outline-success" className="p-2">
            Search
          </Button>
        </InputGroup>
        <Form.Text style={{ textAlign: "center" }}>
          Currently you can only search based off a users Name, If needed make
          sure to verify the users email
        </Form.Text>
      </Form>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>EMAIL</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user_name}</td>
                  <td>{order.user && order.user.email}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      <Row style={{ justifyContent: "center" }}>
        {pages > 1 && (
          <Pagination style={{ justifyContent: "center", fontSize: ".8rem" }}>
            {[...Array(pages).keys()].map((x) => (
              <LinkContainer
                key={x + 1}
                to={
                  userInfo.isAdmin
                    ? search
                      ? `/admin/orderlist/keyword/${search}/page/${x + 1}`
                      : `/admin/orderlist/${x + 1}`
                    : `/admin/orderlist/${x + 1}`
                }
              >
                <Pagination.Item
                  active={x + 1 === page}
                  style={{ padding: "0" }}
                >
                  {x + 1}
                </Pagination.Item>
              </LinkContainer>
            ))}
          </Pagination>
        )}
      </Row>
    </>
  );
};

export default OrderListScreen;
