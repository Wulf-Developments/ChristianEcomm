import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Form, InputGroup, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import { getCategoriesAdmin } from "../../actions/Categories/getCategoriesAdmin";
import { createCategory } from "../../actions/Categories/createCategory";
import { setAlert } from "../../actions/alert";
import { deleteCategory } from "../../actions/Categories/deleteCategory";

const CategoriesList = ({ history, match, location }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword || "";

  const { loading, error, adminCategories } = useSelector(
    (state) => state.category
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const [search, setSearch] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(`/admin/categories/keyword/${search}`);
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
      dispatch(getCategoriesAdmin(keyword));
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, keyword]);

  return (
    <>
      <Meta title={`Categories`} />
      <Row className="align-items-center">
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="my-3"
            variant="outline-success"
            onClick={createCategoryHandler}
          >
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
            {adminCategories &&
              adminCategories.map((category) => (
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
    </>
  );
};

export default CategoriesList;
