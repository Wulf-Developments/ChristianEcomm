import axios from "axios";
import {
  CATEGORY_ERROR,
  DELETE_CATEGORY,
} from "../../constants/categoryConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const deleteExpense = (id) => async (dispatch) => {
  if (
    window.confirm(
      `Are you sure you want to delete this expense? this action cannot be undone.`
    )
  ) {
    try {
      await axios.delete(`/api/expense/${id}`);
      dispatch({ type: DELETE_CATEGORY, payload: id });
      dispatch(setAlert(`Expense: ${id} Has been removed`, "success"));
      window.location.reload();
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
  }
};
