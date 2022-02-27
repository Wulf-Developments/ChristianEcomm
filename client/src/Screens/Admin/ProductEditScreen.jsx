import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { listProductDetails } from "../../actions/Product/listProductDetails";
import { updateProduct } from "../../actions/Product/updateProduct";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import { setAlert } from "../../actions/alert";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const { categories } = useSelector((state) => state.category);
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  // const categoryChangeHandler = async (e) => {
  //   let value = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setCategory({multiValue: [...e.target.selectedOptions].map(o => o.value)});
  // };
  const uploadFileHandler = async (e) => {
    // files, is an array, since we have the ability to upload multiple
    // files we only want the first file.
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    //Triggers the Loader component
    setUploading(true);

    //This makes the request to the backend
    try {
      const config = {
        headers: {
          // Has to have the multipart/form-data!
          // Also only Admins can upload a file, need token
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      //Once the post request is finished, setImage to data, setUploading to false, to remove Loader
      //Component
      setImage(data.data);
      setUploading(false);
      dispatch(setAlert(`Image uploaded successfully`, "success"));
    } catch (error) {
      console.error(error);
      setUploading(false);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(setAlert(`Image did not upload: ${message}`, "danger"));
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <Container fluid style={{ padding: "2%" }}>
        <FormContainer>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <div>
                <Image src={image} fluid />
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    id="image-file"
                    label="Choose File"
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>
              </div>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  placeholder="Enter category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {/* {categories.map((category) => {
                    return (
                      <option value={category._id}>{category.cat_name}</option>
                    );
                  })} */}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ width: "50%" }}
                >
                  Update
                </Button>
              </div>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default ProductEditScreen;
