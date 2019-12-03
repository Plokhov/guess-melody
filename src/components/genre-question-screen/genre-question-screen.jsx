import React from "react";
import PropTypes from "prop-types";

export const GenreQuestionScreen = ({question, screenIndex, onAnswer}) => {
  const {
    answers,
    genre,
  } = question;

  return (
    <section className="game game--genre">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer();
        }}>
          {answers.map((it) => {
            return (
              <div key={`${screenIndex} - answer-${it.id}`} className="track">
                <button className="track__button track__button--play" type="button" />
                <div className="track__status">
                  <audio />
                </div>
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${it.id}`} id={`answer-${it.id}`} />
                  <label className="game__check" htmlFor={`answer-${it.id}`}>Отметить</label>
                </div>
              </div>
            );
          })}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
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
  onAnswer: PropTypes.func.isRequired,
};
