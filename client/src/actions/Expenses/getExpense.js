import axios from "axios";
import {
  EXPENSE_ERROR,
  EXPENSE_REQUEST,
  GET_EXPENSE,
} from "../../constants/expenseConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const getExpense = (id) => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_REQUEST });
    const { data } = await axios.get(`/api/expense/${id}`);
    dispatch({ type: GET_EXPENSE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: EXPENSE_ERROR,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};
