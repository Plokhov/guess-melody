import React from "react";

import {WelcomeScreen} from "../welcom-screen/welcom-screen.jsx";

export const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {gameTime, errorCount} = props;

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
  />;
};
