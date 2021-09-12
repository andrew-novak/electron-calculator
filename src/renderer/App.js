import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { connect } from "react-redux";

import store from "./store";
import Output from "./components/Output";
import Buttons from "./components/Buttons";

const App = () => (
  <StoreProvider store={store}>
    <Output />
    <Buttons />
  </StoreProvider>
);

export default App;
