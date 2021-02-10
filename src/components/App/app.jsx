import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

import Time from "../time/time.jsx";
import Mistakes from "../mistakes/mistakes.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import LoseByTime from "../lose-by-time/lose-by-time.jsx";

import widtTimer from "../hocks/with-timer/width-timer.js";
import withUserAnswers from "../hocks/with-user-answers/with-user-answers.js";
import withActivePlayer from "../hocks/with-active-player/width-active-player.js";

const TimeWrapper = widtTimer(Time);

const GenreQuestionScreenWrapper = withUserAnswers(
    withActivePlayer(GenreQuestionScreen)
);

const ArtistQuestionScreenWrapper = withUserAnswers(
    withActivePlayer(ArtistQuestionScreen)
);

class App extends React.Component {
  _getScreen(question) {
    const {
      gameTime,
      onWelcomeScreenClick,
      onTryAgainClick,
      onUserAnswer,
      mistakes,
      maxMistakes,
      step
    } = this.props;

    if (gameTime === 0) {
      return <LoseByTime
        onTryAgainClick={onTryAgainClick}
      />;
    }

    if (!question) {
      return <WelcomeScreen
        errorCount={maxMistakes}
        gameTime={gameTime}
        onStartButtonClick={onWelcomeScreenClick}
      />;
    } else {
      switch (question.type) {
        case `genre`: return <GenreQuestionScreenWrapper
          screenIndex={step}
          question={question}
          onAnswer={(userAnswer) => onUserAnswer(
              userAnswer,
              question,
              mistakes,
              maxMistakes
          )}
          mistakes={mistakes}
        />;

        case `artist`: return <ArtistQuestionScreenWrapper
          screenIndex={step}
          question={question}
          onAnswer={(userAnswer) => onUserAnswer(
              userAnswer,
              question,
              mistakes,
              maxMistakes
          )}
          mistakes={mistakes}
        />;
      }
    }

    return null;
  }

  render() {
    const {
      questions,
      step,
      mistakes,
    } = this.props;

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

      {this._getScreen(questions[step])}
    </section>;
  }
}

App.propTypes = {
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onTryAgainClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  gameTime: state.gameTime,
  isTimerOn: state.isTimerOn,
  step: state.step,
  mistakes: state.mistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.turnOnTimer());
  },

  onTryAgainClick: () => {
    dispatch(ActionCreator.reset());
  },

  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
        userAnswer,
        question,
        mistakes,
        maxMistakes
    ));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
