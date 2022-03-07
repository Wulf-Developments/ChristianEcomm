import axios from "axios";
import {
  EXPENSE_ERROR,
  EXPENSE_REQUEST,
  UPDATE_EXPENSE,
} from "../../constants/expenseConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const updateExpense = (id) => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_REQUEST });
    const { data } = await axios.post(`/api/expenses/${id}`);
    dispatch({ type: UPDATE_EXPENSE, payload: data });
    dispatch(setAlert(`Expense Report has been updated`, "success"));
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
