import { UPDATE_CATEGORY_RESET } from "../constants/categoryConstants";
import {
  CREATE_EXPENSE,
  DELETE_EXPENSE,
  EXPENSE_ERROR,
  EXPENSE_REQUEST,
  GET_EXPENSE,
  GET_EXPENSES,
  UPDATE_EXPENSE,
} from "../constants/expenseConstants";

export const expenseReducer = (
  state = {
    loading: false,
    expense: {},
    expenses: [],
    success: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case EXPENSE_REQUEST:
      return { ...state, loading: true };
    case GET_EXPENSES:
      return { ...state, loading: false, expenses: action.payload };
    case GET_EXPENSE:
      return { ...state, loading: false, expense: action.payload };
    case UPDATE_EXPENSE:
      return {
        ...state,
        loading: false,
        success: true,
        expense: action.payload,
      };
    case UPDATE_CATEGORY_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        expense: {},
      };
    case CREATE_EXPENSE:
      return {
        ...state,
        loading: false,
        expenses: [action.payload, ...state.expenses],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        loading: false,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload
        ),
      };
    case EXPENSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
