import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import tunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import {compose} from "recompose";

import createAPI from "./api/api.js";
import {settings, questions} from "./mocks/quetions.js";

import App from "./components/app/app.jsx";
import widthGameScreen from "./hocks/width-game-screen/width-game-screen.js";
import {reducer, Operation} from "./reducer.js";

const AppWrapper = widthGameScreen(App);

const init = (gameSettings) => {
  const api = createAPI((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(tunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <AppWrapper
            maxMistakes={gameSettings.errorCount}
          />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(settings, questions);
