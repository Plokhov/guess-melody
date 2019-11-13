import React from "react";
import ReactDOM from "react-dom";

import {settings, questions} from "./components/mocks/quetions.js";

import {App} from "./components/App/app.jsx";

const init = (gameSettings, gameQuestions) => {
  ReactDOM.render(
      <App
        errorCount={gameSettings.errorCount}
        gameTime={gameSettings.gameTime}
        questions={gameQuestions}
      />,
      document.querySelector(`#root`)
  );
};

init(settings, questions);
