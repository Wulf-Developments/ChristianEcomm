import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, deleteProduct, createProduct } from "../actions/product";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

const ProductListScreen = ({ history, match }) => {
  // pulls the pageNumber and Keyword search params
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword, pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(
        `/admin/productlist/search/${search}/page/${pageNumber || 1}`
      );
    } else {
      history.push("/admin/productlist");
    }
  };
  return (
    <>
      <Meta title={`Products | Page ${pageNumber}`} />
      <Form onSubmit={submitHandler} style={{ padding: "2%" }}>
        <InputGroup>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Products"
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
          <Button type="submit" variant="outline-success" className="p-2">
            Search
          </Button>
        </InputGroup>
        <Form.Text style={{ textAlign: "center" }}>
          Currently you can only search based off a Product Name.
        </Form.Text>
      </Form>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row style={{ justifyContent: "center" }}>
            <Paginate
              pages={pages}
              page={page}
              isAdmin={true}
              keyword={keyword}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
