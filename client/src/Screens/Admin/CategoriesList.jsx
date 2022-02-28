import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Pagination,
  Row,
  Form,
  InputGroup,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import { getCategories } from "../../actions/Categories/getCategories";
import { createCategory } from "../../actions/Categories/createCategory";
import { setAlert } from "../../actions/alert";
import { deleteCategory } from "../../actions/Categories/deleteCategory";

const CategoriesList = ({ history, match, location }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;

  const { loading, error, categories, pages, page } = useSelector(
    (state) => state.category
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const [search, setSearch] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(`/admin/categories/keyword/${search}/page/1`);
    } else {
      history.push("/admin/categories");
    }
  };
  const createCategoryHandler = () => {
    const cat_name = prompt(`What is the new category name?`);
    if (cat_name !== "") {
      dispatch(createCategory(cat_name));
    } else {
      dispatch(
        setAlert("You cannot have a category with an empty name", "danger")
      );
    }
  };
  const deleteHandler = (id, history) => {
    dispatch(deleteCategory(id, history));
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getCategories(keyword, pageNumber));
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, pageNumber, keyword]);

  return (
    <>
      <Meta title={`Categories | Page ${pageNumber}`} />
      <Row className="align-items-center">
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createCategoryHandler}>
            <i className="fas fa-plus" /> Create New Category
          </Button>
        </Col>
      </Row>
      <Form onSubmit={submitHandler} style={{ padding: "2%" }}>
        <InputGroup>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Categories"
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
          <Button type="submit" variant="outline-success" className="p-2">
            Search
          </Button>
        </InputGroup>
        <Form.Text style={{ textAlign: "center" }}>
          Currently you can only search based off a category Name
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
              <th>CATEGORY</th>
              <th>SLUG</th>
              <th>CREATED BY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.cat_name}</td>
                  <td>{category.slug}</td>
                  <td>{category.user && category.user.name}</td>
                  <td>
                    <LinkContainer to={`/admin/category/${category._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(category._id, history)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
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
                      ? `/admin/categories/keyword/${search}/page/${x + 1}`
                      : `/admin/categories/${x + 1}`
                    : `/admin/categories/${x + 1}`
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

export default CategoriesList;
