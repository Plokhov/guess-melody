import React from "react";

import {WelcomeScreen} from "../welcom-screen/welcom-screen.jsx";

export const App = (props) => {
  const {gameTime, errorCount} = props;

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
  />;
};
