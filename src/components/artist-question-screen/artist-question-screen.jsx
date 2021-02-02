import React from "react";
import PropTypes from "prop-types";

import {AudioPlayer} from "../audio-player/audio-player.jsx";

export class ArtistQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }
  render() {
    const {question, onAnswer, screenIndex} = this.props;
    const {isPlaying} = this.state;
    const {
      answers,
      song,
    } = question;

    return <section className="game__screen">
      <h2 className="game__title">
        Кто исполняет эту песню?
      </h2>
      <div className="game__track">
        <AudioPlayer
          isPlaying={isPlaying}
          onPlayButtonClick={() => this.setState({isPlaying: !isPlaying})}
          src={song.src}
        />
      </div>

      <form className="game__artist">
        {answers.map((it) => {
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
                  onAnswer(it);
                  this.setState({
                    isPlaying: false,
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
  }
}

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
  onAnswer: PropTypes.func.isRequired,
};
