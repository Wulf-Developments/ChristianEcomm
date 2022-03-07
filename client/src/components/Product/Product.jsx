import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "../Rating";

import "./index.css";

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded product-card">
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.image}
            variant="top"
            className="product-image"
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong className="text-color-dark-txt">{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3" style={{ textAlign: "center" }}>
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
