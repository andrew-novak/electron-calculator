import React from "react";
import { connect } from "react-redux";

const Output = ({ output }) => {
  const { primary, secondary } = output;
  const {
    frontNumber,
    frontModifications,
    calcSign,
    backNumber,
    backModifications,
    equalsSign
  } = secondary;

  const modifications = {
    square: "sqr",
    squareRoot: "\u221A",
    reciprocal: "1/",
    negate: "negate"
  };
  const calcSigns = {
    add: "+",
    subtract: "-",
    multiply: "x",
    divide: "/"
  };

  const preFrontNumberModifs = frontModifications.map(
    modif => `${modifications[modif]}(`
  );
  let postFrontNumberModifs = "";
  for (let i = 0; i < frontModifications.length; i++) {
    postFrontNumberModifs = postFrontNumberModifs + ")";
  }

  const preBackNumberModifs = backModifications.map(
    modif => `${modifications[modif]}(`
  );
  let postBackNumberModifs = "";
  for (let i = 0; i < backModifications.length; i++) {
    postBackNumberModifs = postBackNumberModifs + ")";
  }

  return (
    <>
      <h2>
        {preFrontNumberModifs}
        {frontNumber}
        {postFrontNumberModifs}
        &nbsp;
        {calcSigns[calcSign]}
        &nbsp;
        {preBackNumberModifs}
        {backNumber}
        {postBackNumberModifs}
        &nbsp;
        {equalsSign ? "=" : null}
      </h2>
      <h1>{primary}</h1>
    </>
  );
};

const mapState = state => {
  const { output } = state.math;
  return { output };
};

export default connect(mapState)(Output);
