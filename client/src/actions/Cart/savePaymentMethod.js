import { CART_SAVE_PAYMENT_METHOD } from "../../constants/cartConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const savePaymentMethod = (data) => (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "danger"));
  }
};
