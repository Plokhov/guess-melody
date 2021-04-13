import React from "react";
import PropTypes from "prop-types";
import {Route, Switch, Redirect} from "react-router-dom";

import {connect} from "react-redux";
import {ActionCreator, Operation} from "../../reducer";

import AuthorizationScreen from "../../components/authorization-screen/authorization-screen.jsx";
import WelcomeScreen from "../../components/welcome-screen/welcome-screen.jsx";
import GenreQuestionScreen from "../../components/genre-question-screen/genre-question-screen.jsx";
import ArtistQuestionScreen from "../../components/artist-question-screen/artist-question-screen.jsx";
import WinScreen from "../../components/win-screen/win-screen.jsx";
import LoseByMistakesScreen from "../../components/lose-by-mistakes-screen/lose-by-mistakes-screen.jsx";
import LoseByTimeScreen from "../../components/lose-by-time-screen/lose-by-time-screen.jsx";

import widthAuthorization from "../width-authorization/width-authorization.js";
import withUserAnswers from "../with-user-answers/with-user-answers.js";
import withActivePlayer from "../with-active-player/width-active-player.js";

const AuthorizationScreenWrapper = widthAuthorization(AuthorizationScreen);

const GenreQuestionScreenWrapper = withUserAnswers(
    withActivePlayer(GenreQuestionScreen)
);

const ArtistQuestionScreenWrapper = withUserAnswers(
    withActivePlayer(ArtistQuestionScreen)
);

const widthGameScreen = (Component) => {
  class WidthGameScreen extends React.Component {
    _getScreen(question) {
      const {
        gameTime,
        onWelcomeScreenClick,
        onUserAnswer,
        mistakes,
        maxMistakes,
        questions,
        step
      } = this.props;

      if (step >= questions.length) {
        return <Redirect to="/results" />;
      }

      if (mistakes >= maxMistakes) {
        return <Redirect to="/lose-by-mistakes" />;
      }

      if (gameTime === 0) {
        return <Redirect to="/lose-by-time" />;
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

    shouldComponentUpdate(nextProps) {
      if (this.props.gameTime) {
        return true;
      }

      if (nextProps.step === this.props.step) {
        return false;
      }

      return true;
    }

    render() {
      const {onTryAgainClick} = this.props;
      return <Switch>
        <Route
          path="/"
          exact
          render={() => <Component
            {...this.props}
            renderScreen={(question) => this._getScreen(question)}
          />}
        />
        <Route
          path="/auth"
          exact
          component={AuthorizationScreenWrapper}
        />
        <Route
          path="/results"
          exact
          render={() => <WinScreen
            onRelaunchButtonClick={onTryAgainClick}
          />}
        />
        <Route
          path='/lose-by-mistakes'
          exact
          render={() => <LoseByMistakesScreen
            onRelaunchButtonClick={onTryAgainClick}
          />}
        />
        <Route
          path="/lose-by-time"
          exact
          render={() => <LoseByTimeScreen
            onRelaunchButtonClick={onTryAgainClick}
          />}
        />
      </Switch>;
    }
  }

  WidthGameScreen.propTypes = {
    mistakes: PropTypes.number.isRequired,
    maxMistakes: PropTypes.number.isRequired,
    gameTime: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
    step: PropTypes.number.isRequired,
    onUserAnswer: PropTypes.func.isRequired,
    onWelcomeScreenClick: PropTypes.func.isRequired,
    onTryAgainClick: PropTypes.func.isRequired,
    isAuthorizationRequired: PropTypes.bool.isRequired,
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    gameTime: state.gameTime,
    isTimerOn: state.isTimerOn,
    step: state.step,
    mistakes: state.mistakes,
    questions: state.questions,
    isAuthorizationRequired: state.isAuthorizationRequired,
  });

  const mapDispatchToProps = (dispatch) => ({
    onWelcomeScreenClick: () => {
      dispatch(ActionCreator.incrementStep());
      dispatch(ActionCreator.turnOnTimer());
    },

    onTryAgainClick: () => {
      dispatch(ActionCreator.reset());
      dispatch(Operation.loadQuestions());
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

  return connect(mapStateToProps, mapDispatchToProps)(WidthGameScreen);

};

export default widthGameScreen;
