import React from "react";
import PropTypes from "prop-types";
import {getTime} from '../../utils/utils.js';

const Time = (props) => {
  const {gameTime} = props;
  const time = getTime(gameTime);

  return (<div className="timer__value">
    <span className="timer__mins">
      {time.minutes}
    </span>
    <span className="timer__dots">:</span>
    <span className="timer__secs">
      {time.seconds}
    </span>
  </div>);
};

Time.propTypes = {
  gameTime: PropTypes.number.isRequired,
};

export default Time;
