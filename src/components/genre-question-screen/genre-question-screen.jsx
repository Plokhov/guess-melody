import React from "react";
import PropTypes from "prop-types";

const GenreQuestionScreen = (props) => {
  const {
    question,
    screenIndex,
    onPlayerStop,
    renderPlayer,
    userAnswer,
    onAnswerClick,
    sendUserAnswer,
  } = props;

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
        sendUserAnswer();
      }}
    >
      {answers.map((it, i) => {
        return (
          <div
            className="track"
            key={`${screenIndex} - answer-${it.id}`}
          >
            <div className="game__track">
              {renderPlayer(it, i)}
            </div>
            <div className="game__answer">
              <input
                className="game__input visually-hidden"
                type="checkbox"
                name="answer"
                value={`answer-${it.id}`}
                id={`answer-${it.id}`}
                checked={userAnswer[i]}
                onChange={() => {
                  onAnswerClick(i);
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
        onClick={onPlayerStop}
      >
        Ответить
      </button>
    </form>
  </section>;
};

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
  renderPlayer: PropTypes.func.isRequired,
  onPlayerStop: PropTypes.func.isRequired,
  userAnswer: PropTypes.array,
  onAnswerClick: PropTypes.func.isRequired,
  sendUserAnswer: PropTypes.func.isRequired,
};

export default GenreQuestionScreen;
