import React from "react";
import PropTypes from "prop-types";

import {AudioPlayer} from "../audio-player/audio-player.jsx";

export class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    const {question} = this.props;
    const {answers} = question;

    this.state = {
      activePlayer: -1,
      userAnswer: new Array(answers.length).fill(false),
    };
  }

  render() {
    const {
      question,
      onAnswer,
      screenIndex
    } = this.props;

    const {
      answers,
      genre,
    } = question;

    return <section className="game__screen">
      <h2 className="game__title">
        Выберите {genre} треки
      </h2>
      <form
        className="game__tracks"
        onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer(this.state.userAnswer);
        }}
      >
        {answers.map((it, i) => {
          return (
            <div
              className="track"
              key={`${screenIndex} - answer-${it.id}`}
            >
              <div className="game__track">
                <AudioPlayer
                  src={it.src}
                  isPlaying={i === this.state.activePlayer}
                  onPlayButtonClick={() => this.setState({
                    activePlayer: this.state.activePlayer === i ? -1 : i
                  })}
                />
              </div>
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  name="answer"
                  value={`answer-${it.id}`}
                  id={`answer-${it.id}`}
                  checked={this.state.userAnswer[i]}
                  onChange={() => {
                    const userAnswer = [...this.state.userAnswer];
                    userAnswer[i] = !userAnswer[i];
                    this.setState({userAnswer});
                  }}
                />
                <label className="game__check" htmlFor={`answer-${it.id}`}>
                  Отметить
                </label>
              </div>
            </div>
          );
        })}
        <button
          className="game__submit button"
          type="submit"
          onClick={() => {
            this.setState({
              activePlayer: -1,
              userAnswer: new Array(answers.length).fill(false),
            });
          }}
        >
          Ответить
        </button>
      </form>
    </section>;
  }
}

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
    genre: PropTypes.oneOf([`jazz`, `blues`, `pop`, `rock`, `trance`, `metall`]),
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`jazz`, `blues`, `pop`, `rock`, `trance`, `metall`])
    })).isRequired,
  }).isRequired,
  screenIndex: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
};
