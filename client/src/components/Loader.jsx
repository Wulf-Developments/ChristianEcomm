import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      style={{
        textAlign: "center",
        justifyContent: "center",
        display: "block",
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
        }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
