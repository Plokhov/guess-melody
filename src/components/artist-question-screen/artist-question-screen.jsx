import React from "react";
import PropTypes from "prop-types";

const ArtistQuestionScreen = (props) => {
  const {
    question,
    screenIndex,
    renderPlayer,
    onPlayerStop,
    onAnswerClick,
    sendUserAnswer,
  } = props;

  const {
    answers,
    song,
  } = question;

  return <section className="game__screen">
    <h2 className="game__title">
      Кто исполняет эту песню?
    </h2>
    <div className="game__track">
      {renderPlayer(song, 0)}
    </div>

    <form className="game__artist">
      {answers.map((it, i) => {
        return (
          <div
            className="artist"
            key={`${screenIndex} - answer-${it.id}`}
          >
            <input
              className="artist__input visually-hidden"
              type="radio"
              name="answer"
              value={`artist-${it.id}`}
              id={`artist-${it.id}`}
              onClick={() => {
                onPlayerStop();
                onAnswerClick(i, () => {
                  sendUserAnswer();
                });
              }}
            />
            <label className="artist__name" htmlFor={`artist-${it.id}`}>
              <img
                className="artist__picture"
                src={it.picture}
                alt={it.artist}
              />
              {it.artist}
            </label>
          </div>);
      })}
    </form>
  </section>;
};

ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    }),
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired
    })),
  }).isRequired,
  screenIndex: PropTypes.number.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  onPlayerStop: PropTypes.func.isRequired,
  onAnswerClick: PropTypes.func.isRequired,
  sendUserAnswer: PropTypes.func.isRequired,
};

export default ArtistQuestionScreen;
