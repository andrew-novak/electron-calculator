import React from "react";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";

import {
  clearEntry,
  clearAll,
  setNumber,
  setCalcSign,
  setModification,
  setEqualsSign
} from "../actions/math";

const Buttons = ({
  output,
  clearEntry,
  clearAll,
  setNumber,
  setCalcSign,
  setModification,
  setEqualsSign
}) => {
  const buttons = [
    { text: "%", action: null },
    { text: "CE", action: () => clearEntry() },
    { text: "C", action: () => clearAll() },
    { text: "<x", action: null },
    { text: "1/x", action: () => setModification("reciprocal", output) },
    { text: "x\u00B2", action: () => setModification("square", output) },
    { text: "\u221Ax", action: () => setModification("squareRoot", output) },
    { text: "/", action: () => setCalcSign("divide", output) },
    { text: "7", action: () => setNumber(7, output) },
    { text: "8", action: () => setNumber(8, output) },
    { text: "9", action: () => setNumber(9, output) },
    { text: "x", action: () => setCalcSign("multiply", output) },
    { text: "4", action: () => setNumber(4, output) },
    { text: "5", action: () => setNumber(5, output) },
    { text: "6", action: () => setNumber(6, output) },
    { text: "-", action: () => setCalcSign("subtract", output) },
    { text: "1", action: () => setNumber(1, output) },
    { text: "2", action: () => setNumber(2, output) },
    { text: "3", action: () => setNumber(3, output) },
    { text: "+", action: () => setCalcSign("add", output) },
    { text: "+/-", action: () => setModification("negate", output) },
    { text: "0", action: () => setNumber(0, output) },
    { text: ".", action: null },
    { text: "=", action: () => setEqualsSign(output) }
  ];
  return (
    <Grid container>
      {buttons.map(({ text, action }, index) => (
        <Grid item xs={3} key={index}>
          <Button style={{ textTransform: "none" }} onClick={action}>
            {text}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

const mapState = state => {
  const { output } = state.math;
  return { output };
};

export default connect(mapState, {
  clearEntry,
  clearAll,
  setNumber,
  setCalcSign,
  setModification,
  setEqualsSign
})(Buttons);
