import React from "react";
import PropTypes from 'prop-types';

import {WelcomeScreen} from "../welcome-screen/welcome-screen.jsx";

export const App = (props) => {

  const {gameTime, errorCount, onClick} = props;

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
    onClick={onClick}
  />;
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};
