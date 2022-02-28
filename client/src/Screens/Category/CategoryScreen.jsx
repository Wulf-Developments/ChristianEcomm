import React, { useEffect } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../../actions/Product/listProducts";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import Product from "../../components/Product/Product";

const CategoryScreen = ({ match, location }) => {
  const slug = match.params.slug;
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const { loading, products, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, slug));
  }, [dispatch, keyword, pageNumber, location, slug]);

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
            {pages > 1 && (
              <Pagination>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    to={
                      keyword && slug
                        ? `/category/${slug}/search/${keyword}/page/${x + 1}`
                        : `/category/${slug}/page/${x + 1}`
                    }
                  >
                    <Pagination.Item active={x + 1 === page}>
                      {x + 1}
                    </Pagination.Item>
                  </LinkContainer>
                ))}
              </Pagination>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default CategoryScreen;
