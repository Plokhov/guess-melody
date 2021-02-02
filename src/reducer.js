const isArtistAnswerCorrect = (userAnswer, question) =>
  userAnswer.artist === question.song.artist;


const isGenreAnswerCorrect = (userAnswer, question) =>
  userAnswer.every((it, i) => it === (
    question.answers[i].genre === question.genre
  ));

const initialState = {
  gameTime: 300,
  step: -1,
  mistakes: 0,
};

const ActionCreator = {
  decrementTime: () => ({
    type: `DECREMENT_TIME`,
    payload: 1,
  }),

  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

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
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
};
