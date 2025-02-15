import React from "react";
import { Pagination, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    <Row style={{ justifyContent: "center" }}>
      {pages > 1 && (
        <Pagination style={{ justifyContent: "center" }} variant="secondary">
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : keyword
                  ? `/admin/admin-panel/products/productlist/search/${keyword}/page/${
                      x + 1
                    }`
                  : `/admin/admin-panel/products/productlist/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </Row>
  );
};

export default Paginate;
