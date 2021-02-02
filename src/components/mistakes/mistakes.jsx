import React from "react";
import PropTypes from "prop-types";

export const Mistakes = ({mistakes}) => {
  return <div className="game__mistakes">
    {new Array(mistakes).fill(``).map((it, i) => {
      return <div key={`mistakes-${i}`} className="wrong"></div>;
    })}
  </div>;
};

Mistakes.propTypes = {
  mistakes: PropTypes.number.isRequired,
};
