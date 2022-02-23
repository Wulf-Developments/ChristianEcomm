import axios from "axios";
import {
  ADD_CATEGORY,
  CATEGORY_ERROR,
} from "../../constants/categoryConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const createCategory = (categoryName) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/category", {
      cat_name: categoryName,
    });
    console.log(data);
    dispatch({ type: ADD_CATEGORY, payload: data });
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
