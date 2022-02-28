import axios from "axios";
import {
  CATEGORIES_ADMIN,
  CATEGORY_ERROR,
  GET_CATEGORY_REQUEST,
} from "../../constants/categoryConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const getCategoriesAdmin =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_CATEGORY_REQUEST });
      const { data } = await axios.get(
        `/api/category/admin?keyword=${keyword}`
      );
      dispatch({ type: CATEGORIES_ADMIN, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CATEGORY_ERROR,
        payload: message,
      });
      dispatch(setAlert(message, "danger"));
    }
  };
