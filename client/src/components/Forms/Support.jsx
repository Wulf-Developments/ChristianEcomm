import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import FormContainer from "../FormContainer";
import Loader from "../Loader";
import Message from "../Message";
import Meta from "../Meta";

const Support = () => {
  const [support, setSupport] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState({
    variant: "danger",
    text: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSupport({ ...support, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      setLoading(!loading);
      const data = await axios({
        method: "POST",
        url: `/api/support`,
        data: support,
      });
      if (data.data.success) {
        setLoading(false);
      }
      setError(!error);
      setMessage({
        variant: "success",
        text: "Message was received successfully, you should hear from us soon",
      });
      setSupport({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(!error);
      setMessage({
        variant: "danger",
        text: `Something went wrong \n ${e}`,
      });
    }
  };
  return (
    <div>
      <Meta title={`Crown of Life Products | Support`} />
      <FormContainer>
        <div className="primary-bg rounded" style={{ alignItems: "center" }}>
          {error && <Message variant={message.variant}>{message.text}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <>
              <h1
                style={{
                  fontSize: "2em",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Support
              </h1>
              <Form
                style={{
                  fontFamily: "sans-serif",
                  padding: "5%",
                  borderRadius: "5%",
                  color: "white",
                }}
                className="slategray-bg "
                onSubmit={submitHandler}
              >
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={support.name}
                      placeholder="Please enter your full name"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={support.email}
                      placeholder="Enter email"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="phone">
                    <Form.Label>Phone - (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone number"
                      name="phone"
                      value={support.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Form.Control
                  as="textarea"
                  placeholder="Please be as descriptive as possible with the issue."
                  style={{ height: "100px" }}
                  name="message"
                  value={support.message}
                  onChange={handleChange}
                />
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="success"
                    type="submit"
                    style={{ width: "75%", margin: "5%" }}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </>
          )}
        </div>
      </FormContainer>
    </div>
  );
};

export default Support;
