import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

// Components
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";
import Meta from "../components/Meta";

import { setAlert } from "../actions/alert";

const ResetPassword = () => {
  // get param token
  const { resettoken } = useParams();
  const dispatch = useDispatch();
  // State
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  // Pull items from state
  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password === passConfirm) {
        const data = await axios({
          method: "PUT",
          url: `/api/auth/resetpassword/${resettoken}`,
          data: { password },
        });
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data.data,
        });
      }
      dispatch(setAlert(`Passwords have to match`, "danger"));
    } catch (e) {
      console.log(e);
      dispatch(setAlert(`Password Reset Failed... ${e.message}`, "danger"));
    }
  };
  return (
    <Container>
      <Meta title={`Honey Do | New Password`} />
      <FormContainer>
        <h1 style={{ color: "white" }}>Enter New Password</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="password">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter New Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                value={password}
                placeholder="New Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="passConfirm">
            <FloatingLabel
              controlId="floatingInput"
              label="Confirm New Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                value={passConfirm}
                placeholder="New Password"
                onChange={(e) => {
                  setPassConfirm(e.target.value);
                }}
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>
          {loading ? (
            <Loader />
          ) : (
            <Button
              type="submit"
              variant="dark"
              style={{ width: "100%", marginTop: "2%" }}
            >
              Set Password
            </Button>
          )}
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ResetPassword;
