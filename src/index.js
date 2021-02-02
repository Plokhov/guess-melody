import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import {settings, questions} from "./components/mocks/quetions.js";

import App from "./components/app/app.jsx";
import {reducer} from "./reducer.js";

const init = (gameSettings, gameQuestions) => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          maxMistakes={gameSettings.errorCount}
          questions={gameQuestions}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(settings, questions);
