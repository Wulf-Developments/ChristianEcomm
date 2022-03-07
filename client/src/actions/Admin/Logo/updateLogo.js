import axios from "axios";
import { UPDATE_LOGO } from "../../../constants/dynamicConstants";
import { setAlert } from "../../alert";

export const updateLogo = (image) => async (dispatch) => {
  try {
    const { data } = await axios.put("/api/dynamic/logo", {
      value: image,
    });
    dispatch({ type: UPDATE_LOGO, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
