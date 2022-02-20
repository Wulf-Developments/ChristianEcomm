import axios from "axios";
import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
} from "../../constants/productConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const createProductReview = (productId, review) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });
    await axios.post(`/api/products/${productId}/reviews`, review);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
    dispatch(setAlert(`Review was created`, "success"));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};
