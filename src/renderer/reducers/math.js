import {
  CLEAR_ENTRY,
  CLEAR_ALL,
  NEW_OUTPUT,
  UPDATE_OUTPUT
} from "../constants/actionTypes";

const initialState = {
  output: {
    primary: "0",
    secondary: {
      frontNumber: null,
      frontModifications: [],
      calcSign: null,
      backNumber: null,
      backModifications: [],
      equalsSign: false
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ENTRY:
      return {
        ...state,
        output: {
          ...state.output,
          primary: initialState.output.primary
        }
      };

    case CLEAR_ALL:
      return initialState;

    case NEW_OUTPUT:
      return {
        ...state,
        output: {
          ...initialState.output,
          primary: action.primary,
          secondary: {
            ...initialState.output.secondary,
            ...(action.secondary ? { ...action.secondary } : null)
          }
        }
      };

    case UPDATE_OUTPUT:
      return {
        ...state,
        output: {
          primary:
            action.primary != null ? action.primary : state.output.primary,
          secondary: {
            ...state.output.secondary,
            ...(action.secondary ? { ...action.secondary } : null)
          }
        }
      };

    default:
      return state;
  }
};
