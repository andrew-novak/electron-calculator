import {
  CLEAR_ENTRY,
  CLEAR_ALL,
  NEW_OUTPUT,
  UPDATE_OUTPUT
} from "../constants/actionTypes";

export const clearEntry = () => dispatch => dispatch({ type: CLEAR_ENTRY });

export const clearAll = () => dispatch => dispatch({ type: CLEAR_ALL });

export const setNumber = (no, output) => dispatch => {
  if (no === "0" && output.primary === "0") return;
  if (output.primary === "0")
    return dispatch({ type: UPDATE_OUTPUT, primary: no });
  if (output.secondary.calcSign)
    return dispatch({ type: UPDATE_OUTPUT, primary: no });
  dispatch({ type: UPDATE_OUTPUT, primary: `${output.primary}${no}` });
};

export const setCalcSign = (calcSign, output) => dispatch => {
  /*if (calcSign === "divide" && output.primary === 0)
    return dispatch({
      type: UPDATE_OUTPUT,
      secondary: { frontNumber: "Cannot divide by zero" }
    });*/
  const { primary, secondary } = output;
  const { frontNumber, equalsSign } = secondary;
  // no front number for secondary line
  if (!frontNumber)
    return dispatch({
      type: UPDATE_OUTPUT,
      secondary: { frontNumber: primary, calcSign }
    });
  // there's an equals sign
  if (equalsSign)
    return dispatch({
      type: NEW_OUTPUT,
      primary,
      secondary: { frontNumber: primary, calcSign }
    });
  dispatch({ type: UPDATE_OUTPUT, secondary: { calcSign } });
};

const calcModif = {
  square: no => Math.pow(no, 2),
  squareRoot: no => Math.sqrt(no),
  reciprocal: no => 1 / no,
  negate: no => -no
};

const calc = (sign, no1, no2) => {
  switch (sign) {
    case "add":
      return no1 + no2;
    case "subtract":
      return no1 - no2;
    case "multiply":
      return no1 * no2;
    case "divide":
      return no1 / no2;
    default:
      return null;
  }
};

const applyModifs = (number, modifsArr) => {
  let result = number;
  modifsArr.reverse().forEach(modif => {
    result = calcModif[modif](result);
  });
  return result;
};

export const setModification = (modif, output) => dispatch => {
  /*if (modif === "reciprocal" && output.primary === 0) return dispatch({
    type: UPDATE_OUTPUT,
    secondary: { frontNumber:  }
  });*/
  const frontModifications = [modif, ...output.secondary.frontModifications];
  const primary = calcModif[modif](output.primary);
  dispatch({
    type: UPDATE_OUTPUT,
    primary,
    secondary: { frontNumber: output.primary, frontModifications }
  });
};

export const setEqualsSign = output => dispatch => {
  const { primary, secondary } = output;
  const {
    frontModifications,
    frontNumber,
    calcSign,
    backNumber,
    equalsSign
  } = secondary;
  // there's already an equals sign
  if (equalsSign) {
    return dispatch({
      type: UPDATE_OUTPUT,
      primary: calc(calcSign, primary, backNumber),
      secondary: { frontNumber: primary }
    });
  }
  // calculation sign is set
  if (calcSign) {
    console.log(frontNumber);
    const modifiedFront = applyModifs(frontNumber, frontModifications);
    console.log(modifiedFront);
    return dispatch({
      type: UPDATE_OUTPUT,
      primary: calc(calcSign, modifiedFront, primary),
      secondary: { backNumber: primary, equalsSign: true }
    });
  }
  // no secondary, don't calculate anything, take the exsiting number and add sign
  dispatch({
    type: UPDATE_OUTPUT,
    secondary: { frontNumber: primary, equalsSign: true }
  });
};
