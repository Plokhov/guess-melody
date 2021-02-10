import {checkIfAnswerIsCorrect} from "./utils/utils.js";

const initialState = {
  step: -1,
  gameTime: 300,
  isTimerOn: false,
  mistakes: 0,
  questions: [],
};

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  DECREMENT_TIME: `DECREMENT_TIME`,
  TURN_ON_TIMER: `TURN_ON_TIMER`,
  RESET: `RESET`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  decrementTime: () => ({
    type: ActionType.DECREMENT_TIME,
    payload: 1,
  }),

  turnOnTimer: () => ({
    type: ActionType.TURN_ON_TIMER,
    payload: true,
  }),

  reset: () => ({
    type: ActionType.RESET,
  }),

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
    const answerIsCorrect = checkIfAnswerIsCorrect(userAnswer, question);

    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: ActionType.RESET,
      };
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  loadQuestions: (questions) => ({
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  }),
};

const Operation = {
  loadQuestions: () => (dispatch, _getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {
        step: state.step + action.payload,
      });

    case ActionType.DECREMENT_TIME:
      return Object.assign({}, state, {
        gameTime: state.gameTime - action.payload,
      });

    case ActionType.TURN_ON_TIMER:
      return Object.assign({}, state, {
        isTimerOn: action.payload,
      });

    case ActionType.RESET:
      return Object.assign({}, initialState);

    case ActionType.INCREMENT_MISTAKES:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.payload,
      });
  }
  return state;
};

export {
  ActionCreator,
  reducer,
  Operation,
};
