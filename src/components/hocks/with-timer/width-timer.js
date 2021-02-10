import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../../reducer.js";

const withTimer = (Component) => {
  class WithTimer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.timeTick = null;
      this._tick = this._tick.bind(this);
    }

    _tick() {
      const {gameTime, onTimeTick} = this.props;

      if (gameTime > 0) {
        onTimeTick();
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
      return <Component
        gameTime={this.props.gameTime}
      />;
    }
  }

  WithTimer.propTypes = {
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

  return connect(mapStateToProps, mapDispatchToProps)(WithTimer);
};

export default withTimer;
