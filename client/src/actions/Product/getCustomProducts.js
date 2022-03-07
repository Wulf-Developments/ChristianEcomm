import axios from "axios";
import {
  CUSTOM_PRODUCT_LIST_FAIL,
  CUSTOM_PRODUCT_LIST_REQUEST,
  CUSTOM_PRODUCT_LIST_SUCCESS,
} from "../../constants/productConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const getCustomProducts =
  (keyword = "", pageNumber = "", category = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: CUSTOM_PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/printify?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}`
      );
      console.log(data);
      dispatch({
        type: CUSTOM_PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CUSTOM_PRODUCT_LIST_FAIL,
        payload: message,
      });
      dispatch(
        setAlert(`Problem getting products from database ${message}`, "danger")
      );
    }
  };
