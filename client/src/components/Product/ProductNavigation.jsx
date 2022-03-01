import React from "react";
import { Nav, NavDropdown, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../actions/Categories/getCategories";

const ProductNavigation = () => {
  const dispatch = useDispatch();
  // should return true if the screen size is less than 780px wide
  const isMobile = useMediaQuery({ query: `(max-width: 780px)` });

  // app state
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <>
      {isMobile ? (
        <>
          <NavDropdown title="Products" id="productsmenu">
            {/* <LinkContainer to="/custom-products">
              <Nav.Link>Custom Products</Nav.Link>
            </LinkContainer> */}
            {categories &&
              categories.map((category) => {
                return (
                  <LinkContainer
                    key={category._id}
                    to={`/category/${category.slug}`}
                  >
                    <Nav.Link>{category.cat_name}</Nav.Link>
                  </LinkContainer>
                );
              })}
          </NavDropdown>
        </>
      ) : (
        <Row style={{ justifyContent: "space-evenly", width: "100%" }}>
          {/* <LinkContainer to="/custom-products">
            <Nav.Link>Custom Products</Nav.Link>
          </LinkContainer> */}
          {categories &&
            categories.map((category) => {
              return (
                <LinkContainer
                  key={category._id}
                  to={`/category/${category.slug}`}
                >
                  <Nav.Link>{category.cat_name}</Nav.Link>
                </LinkContainer>
              );
            })}
        </Row>
      )}
    </>
  );
};

export default ProductNavigation;
