import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

const getMinutes = (timeInSeconds) => {
  let minutes = (timeInSeconds < 60)
    ? 0
    : Math.floor(timeInSeconds / 60);

  minutes = (minutes < 10) ? `0` + minutes : minutes;

  return minutes;
};

const getSeconds = (timeInSeconds) => {
  let seconds = (timeInSeconds < 60)
    ? timeInSeconds
    : timeInSeconds % 60;

  seconds = (seconds < 10) ? `0` + seconds : seconds;

  return seconds;
};

export class Timer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.timeTick = null;
    this._tick = this._tick.bind(this);
  }

  _tick() {
    if (this.props.gameTime > 0) {
      this.props.onTimeTick();
    } else {
      clearTimeout(this.timeTick);
    }
  }

  componentDidUpdate() {
    const {isTimerOn} = this.props;

    if (isTimerOn) {
      this.timeTick = setTimeout(this._tick, 1000);
    } else {
      clearTimeout(this.timeTick);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeTick);
  }

  render() {
    const {gameTime} = this.props;

    return (<div className="timer__value">
      <span className="timer__mins">
        {getMinutes(gameTime)}
      </span>
      <span className="timer__dots">:</span>
      <span className="timer__secs">
        {getSeconds(gameTime)}
      </span>
    </div>);
  }
}

Timer.propTypes = {
  gameTime: PropTypes.number.isRequired,
  isTimerOn: PropTypes.bool.isRequired,
  onTimeTick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  gameTime: state.gameTime,
  isTimerOn: state.isTimerOn,
});

const mapDispatchToProps = (dispatch) => ({
  onTimeTick: () => {
    dispatch(ActionCreator.decrementTime());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
