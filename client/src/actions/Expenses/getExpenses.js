import axios from "axios";
import {
  EXPENSE_ERROR,
  EXPENSE_REQUEST,
  GET_EXPENSES,
} from "../../constants/expenseConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const getExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_REQUEST });
    const { data } = await axios.get(`/api/expenses`);
    dispatch({ type: GET_EXPENSES, payload: data });
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
