import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// actions/constants
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { getCategory } from "../../actions/Categories/getCategory";
// Components
import FormContainer from "../FormContainer";
import { updateCategory } from "../../actions/Categories/updateCategory";
import Loader from "../Loader";

const CategoryEdit = ({ match, history }) => {
  // utitily functions
  const dispatch = useDispatch();
  const id = match.params.id;
  // component state
  const [formData, setFormData] = useState({
    cat_name: "",
  });
  // destructure component state
  const { cat_name } = formData;
  // App State
  const { category, success, loading } = useSelector((state) => state.category);

  useEffect(() => {
    if (success) {
      dispatch({ type: UPDATE_CATEGORY_RESET });
      history.push("/admin/categorylist");
    } else {
      if (!category.cat_name || category._id !== id) {
        dispatch(getCategory(id));
      } else {
        setFormData(category);
      }
    }
  }, [dispatch, history, success, category, id]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = () => {
    dispatch(updateCategory(formData));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="cat_name"
                value={cat_name}
                placeholder="Category Name"
                onChange={handleChange}
                required
              />
              <Form.Text>
                Please limit the category name to a Single Phrase i.e Necklace,
                multiple names such as Necklaces Bracelets or any variation
                thereof mess with the finding of products.
              </Form.Text>
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button type="submit" variant="primary" style={{ width: "50%" }}>
                Update
              </Button>
            </div>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default CategoryEdit;
