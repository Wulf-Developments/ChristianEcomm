import axios from "axios";
import {
  CREATE_EXPENSE,
  EXPENSE_ERROR,
  EXPENSE_REQUEST,
} from "../../constants/expenseConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const createExpense = (expense) => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_REQUEST });
    const { data } = await axios.post(`/api/expenses`, expense);
    dispatch({ type: CREATE_EXPENSE, payload: data });
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
