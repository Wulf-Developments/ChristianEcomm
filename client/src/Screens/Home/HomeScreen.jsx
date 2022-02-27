import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product/Product";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import Meta from "../../components/Meta";
import { listProducts } from "../../actions/Product/listProducts";
import "./Home.css";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const category = match.params.slug;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const { loading, products, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category));
  }, [dispatch, keyword, pageNumber, category]);

  return (
    <>
      <Meta />
      {!keyword && !category ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
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
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
