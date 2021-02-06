const isAnswerCorrect = (userAnswer, question) => {
  let answerIsCorrect = false;

  switch (question.type) {
    case `artist`:
      answerIsCorrect = userAnswer.every((it, i) => it === (
        question.answers[i].artist === question.song.artist
      ));
      break;
    case `genre`:
      answerIsCorrect = userAnswer.every((it, i) => it === (
        question.answers[i].genre === question.genre
      ));
      break;
  }

  return answerIsCorrect;
};

const initialState = {
  gameTime: 300,
  isTimerOn: false,
  step: -1,
  mistakes: 0,
};

const ActionCreator = {
  decrementTime: () => ({
    type: `DECREMENT_TIME`,
    payload: 1,
  }),

  turnOnTimer: () => ({
    type: `TURN_ON_TIMER`,
    payload: true,
  }),

  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  reset: () => ({
    type: `RESET`
  }),

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
    const answerIsCorrect = isAnswerCorrect(userAnswer, question);

    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: answerIsCorrect ? 0 : 1,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `DECREMENT_TIME`: return Object.assign({}, state, {
      gameTime: state.gameTime - action.payload,
    });

    case `TURN_ON_TIMER`: return Object.assign({}, state, {
      isTimerOn: action.payload,
    });

    case `INCREMENT_STEP`: return Object.assign({}, state, {
      step: state.step + action.payload,
    });

    case `INCREMENT_MISTAKES`: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload,
    });

    case `RESET`: return Object.assign({}, initialState);
  }

  return state;
};

export {
  ActionCreator,
  reducer,
};
