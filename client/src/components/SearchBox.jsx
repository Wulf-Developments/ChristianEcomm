import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="search-box">
      <InputGroup>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products"
          className="mr-sm-2 ml-sm-5 "
        ></Form.Control>
        <Button type="submit" className="p-2 darkslategray-bg">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
