import React from "react";
import {AudioPlayer} from "../../audio-player/audio-player.jsx";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };

      this._onPlayerStop = this._onPlayerStop.bind(this);
    }

    _onPlayerStop() {
      this.setState({
        activePlayer: -1,
      });
    }

    render() {
      const {activePlayer} = this.state;

      return (<Component
        {...this.props}
        onPlayerStop={this._onPlayerStop}
        renderPlayer={(it, i) =>{
          return (<AudioPlayer
            src={it.src}
            isPlaying={i === activePlayer}
            onPlayButtonClick={() => this.setState((prevState) => ({
              activePlayer: prevState.activePlayer === i ? -1 : i
            }))}
          />);
        }}
      />);
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
