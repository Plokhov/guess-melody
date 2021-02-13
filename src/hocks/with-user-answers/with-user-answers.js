import React from "react";
import PropTypes from "prop-types";

const withUserAnswers = (Component) => {
  class WidthUserAnswers extends React.PureComponent {
    constructor(props) {
      super(props);

      const {question} = this.props;
      const {answers} = question;

      this.state = {
        userAnswer: new Array(answers.length).fill(false),
      };

      this._userRespontedHandle = this._userRespontedHandle.bind(this);
      this._sendUserAnswer = this._sendUserAnswer.bind(this);
    }

    _userRespontedHandle(numberAnswer, callback) {
      const userAnswer = [...this.state.userAnswer];
      userAnswer[numberAnswer] = !userAnswer[numberAnswer];
      this.setState({userAnswer}, callback);
    }

    _sendUserAnswer() {
      const {
        onAnswer,
        question,
      } = this.props;

      const {answers} = question;

      onAnswer(this.state.userAnswer);

      this.setState({
        userAnswer: new Array(answers.length).fill(false),
      });
    }

    render() {
      return (<Component
        {...this.props}
        userAnswer = {this.state.userAnswer}
        onAnswerClick = {this._userRespontedHandle}
        sendUserAnswer = {this._sendUserAnswer}
      />);
    }
  }

  WidthUserAnswers.propTypes = {
    question: PropTypes.shape({
      type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
      song: PropTypes.shape({
        artist: PropTypes.string,
        src: PropTypes.string,
      }),
      genre: PropTypes.string,
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
        genre: PropTypes.string,
        picture: PropTypes.string,
        artist: PropTypes.string,
      })).isRequired,
    }).isRequired,
    onAnswer: PropTypes.func.isRequired,
  };

  return WidthUserAnswers;
};

export default withUserAnswers;
