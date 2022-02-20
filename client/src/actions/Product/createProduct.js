import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
} from "../../constants/productConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const createProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });
    const { data } = await axios.post(`/api/products`, {});

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
    dispatch(setAlert(`Product created`, "success"));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};
