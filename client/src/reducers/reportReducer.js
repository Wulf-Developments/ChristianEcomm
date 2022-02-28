import {
  ORDER_REPORTS,
  REPORTS_REQUEST,
  USER_REPORTS,
} from "../constants/reportConstants";

export const reportReducer = (
  state = {
    userReport: {},
    orderReport: {},
    expenseReport: {},
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case REPORTS_REQUEST:
      return { ...state, loading: true };
    case USER_REPORTS:
      return { ...state, loading: false, userReport: action.payload };
    case ORDER_REPORTS:
      return {
        ...state,
        loading: false,
        orderReport: action.payload,
      };
    default:
      return { ...state };
  }
};
