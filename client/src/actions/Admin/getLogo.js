import axios from "axios";
import {
  DYNAMIC_CONTENT_REQUEST,
  GET_LOGO,
} from "../../constants/dynamicConstants";
import { setAlert } from "../alert";

export const getLogo = () => async (dispatch) => {
  try {
    dispatch({ type: DYNAMIC_CONTENT_REQUEST });
    const { data } = await axios.get("/api/dynamic/Logo");
    console.log(data);
    dispatch({ type: GET_LOGO, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
