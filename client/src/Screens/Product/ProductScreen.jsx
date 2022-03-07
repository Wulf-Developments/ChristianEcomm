import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../../components/Rating";
import { useDispatch, useSelector } from "react-redux";

// actions/constants
import { listProductDetails } from "../../actions/Product/listProductDetails";
import { createProductReview } from "../../actions/Product/createProductReview";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";

// components
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";

// css
import "./index.css";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { loading, e, product } = useSelector((state) => state.productDetails);

  const { error: errorProductReview, success: successProductReview } =
    useSelector((state) => state.productReviewCreate);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };
  return (
    <>
      <Meta title={`Crown of Life Products | ${product.name}`} />
      <Link className="btn btn-dark my-3" to={`/`}>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : e ? (
        <Message variant="danger">{e}</Message>
      ) : (
        <>
          <Row style={{ justifyContent: "space-evenly" }}>
            <Col lg={6} md={8} className="product-image-container">
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col lg={3} md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Price:</b> ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Description:</b> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={3} className="product-details-container">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="product-review-container">
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}

            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ backgroundColor: "#cfcfcf" }}>
                  <h2>Write a customer review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Average</option>
                          <option value="4">4 - Great</option>
                          <option value="5">5 - Exceptional</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4} className="product-review-container-review">
              <ListGroup>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
