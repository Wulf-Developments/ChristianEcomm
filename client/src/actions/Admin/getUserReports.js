import axios from "axios";
import { REPORTS_REQUEST, USER_REPORTS } from "../../constants/reportConstants";
import { setAlert } from "../alert";

export const getUserReports = () => async (dispatch) => {
  try {
    dispatch({ type: REPORTS_REQUEST });
    const { data } = await axios.get("/api/admin/reports/users");
    dispatch({ type: USER_REPORTS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
