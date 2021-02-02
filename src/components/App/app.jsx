import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer";
import Timer from "../timer/timer.jsx";
import {Mistakes} from "../mistakes/mistakes.jsx";
import {WelcomeScreen} from "../welcome-screen/welcome-screen.jsx";
import {GenreQuestionScreen} from "../genre-question-screen/genre-question-screen.jsx";
import {ArtistQuestionScreen} from "../artist-question-screen/artist-question-screen.jsx";
import {LoseByTime} from "../lose-by-time/lose-by-time.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTimerOn: false,
    };

    this._turnOnTimer = this._turnOnTimer.bind(this);
  }

  _turnOnTimer() {
    this.setState({
      isTimerOn: true,
    });
  }

  _getScreen(question) {
    const {
      gameTime,
      onWelcomeScreenClick,
      onUserAnswer,
      mistakes,
      maxMistakes,
      step
    } = this.props;

    if (gameTime === 0) {
      return <LoseByTime
        onStartButtonClick={onWelcomeScreenClick}
      />;
    }

    if (!question) {
      return <WelcomeScreen
        errorCount={maxMistakes}
        gameTime={gameTime}
        onStartButtonClick={onWelcomeScreenClick}
        turnOnTimer={this._turnOnTimer}
      />;
    } else {
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
    }

    return null;
  }

  render() {
    const {
      questions,
      step,
      mistakes,
      maxMistakes,
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

        <Timer
          isTimerOn={this.state.isTimerOn}
          maxMistakes={maxMistakes}
        />
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
  gameTime: state.gameTime,
  step: state.step,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => {
    dispatch(ActionCreator.incrementStep());
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
