import React from "react";
import PropTypes from "prop-types";

import Time from "../time/time.jsx";
import Mistakes from "../mistakes/mistakes.jsx";

import widtTimer from "../../hocks/with-timer/width-timer.js";

const TimeWrapper = widtTimer(Time);

const App = (props) => {
  const {
    questions,
    step,
    mistakes,
    renderScreen,
  } = props;

  return <section className="game">
    <header className="game__header">
      <a className="game__back">
        <span className="visually-hidden">
          Сыграть ещё раз
        </span>
        <img
          className="game__logo"
          src="img/melody-logo-ginger.png"
          alt="Угадай мелодию"
        />
      </a>
      <TimeWrapper />
      <Mistakes mistakes={mistakes} />
    </header>
    {renderScreen(questions[step])}
  </section>;
};

App.propTypes = {
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onTryAgainClick: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  renderScreen: PropTypes.func.isRequired,
};

export default App;
