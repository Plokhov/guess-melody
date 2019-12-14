import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer";
import {Mistakes} from "../mistakes/mistakes.jsx";
import {WelcomeScreen} from "../welcome-screen/welcome-screen.jsx";
import {GenreQuestionScreen} from "../genre-question-screen/genre-question-screen.jsx";
import {ArtistQuestionScreen} from "../artist-question-screen/artist-question-screen.jsx";

class App extends React.PureComponent {
  _getScreen(question) {
    if (!question) {
      const {
        gameTime,
        maxMistakes,
        onWelcomeScreenClick
      } = this.props;

      return <WelcomeScreen
        time={gameTime}
        errorCount={maxMistakes}
        onStartButtonClick={onWelcomeScreenClick}
      />;
    }

    const {
      onUserAnswer,
      mistakes,
      maxMistakes,
      step
    } = this.props;


    switch (question.type) {
      case `genre`: return <GenreQuestionScreen
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

      case `artist`: return <ArtistQuestionScreen
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

    return null;
  }

  render() {
    const {
      questions,
      step,
      mistakes
    } = this.props;

    return <section className="game game--artist">
      <header className="game__header">
        <a className="game__back">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <div className="timer__value">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

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
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
});


const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

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
