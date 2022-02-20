import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import Product from "../../components/Product/Product";

const CategoryScreen = ({ match }) => {
  const slug = match.params.slug;
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const { loading, products, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="products-listing">
            {products.map((product) => {
              return (
                <Col
                  className="align-items-stretch d-flex"
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Row style={{ justifyContent: "center" }}>
            
          </Row>
        </>
      )}
    </>
  );
};

export default CategoryScreen;
