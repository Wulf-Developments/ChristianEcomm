import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCustomProducts } from "../../actions/Product/getCustomProducts";
import Loader from "../Loader";
import Meta from "../Meta";
import Paginate from "../Paginate";
import CustomProductItem from "./CustomProductItem";

const CustomProducts = ({ match }) => {
  const keyword = match.params.keyword;
  // the slug may contain more than one character seperated by a dash
  // we need to split this, and then rejoin the string for the regex on the backend to work
  // correctly.
  const category = match.params.slug;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const { loading, products, page, pages } = useSelector(
    (state) => state.customList
  );

  useEffect(() => {
    dispatch(getCustomProducts(keyword, pageNumber, category));
  }, [dispatch, keyword, pageNumber, category]);

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
                  <CustomProductItem product={product} />
                </Col>
              );
            })}
          </Row>
          <Row style={{ justifyContent: "center" }}>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
              category={category ? category : ""}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default CustomProducts;
