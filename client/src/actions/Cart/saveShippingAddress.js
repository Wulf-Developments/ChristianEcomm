import { CART_SAVE_SHIPPING_ADDRESS } from "../../constants/cartConstants";
import { setAlert } from "../alert";
import { logout } from "../userActions";

export const saveShippingAddress = (data) => (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
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
