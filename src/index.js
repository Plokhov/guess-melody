import React from "react";
import ReactDOM from "react-dom";

import {App} from "./components/App/app.jsx";

const init = () => {
  const settings = {
    gameTime: 7,
    errorCount: 4,
  };

  ReactDOM.render(
      <App
        errorCount={settings.errorCount}
        gameTime={settings.gameTime}
      />,
      document.querySelector(`#root`)
  );
};

init();
