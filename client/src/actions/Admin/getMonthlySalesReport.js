import axios from "axios";
import {
  ORDER_REPORTS,
  REPORTS_REQUEST,
} from "../../constants/reportConstants";
import { setAlert } from "../alert";

export const getMonthlySalesReport = () => async (dispatch) => {
  try {
    dispatch({ type: REPORTS_REQUEST });
    const { data } = await axios.get("/api/admin/reports/orders");
    dispatch({ type: ORDER_REPORTS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
