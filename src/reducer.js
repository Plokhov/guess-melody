import {checkIfAnswerIsCorrect} from "./utils/utils.js";

const initialState = {
  step: -1,
  gameTime: 300,
  isTimerOn: false,
  mistakes: 0,
  questions: [],
  isAuthorizationRequired: false,
  userId: 0,
  userEmail: ``,
  userLogin: ``,
  userPassword: ``,
};

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  DECREMENT_TIME: `DECREMENT_TIME`,
  TURN_ON_TIMER: `TURN_ON_TIMER`,
  RESET: `RESET`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  REQUIRED_AUTORIZATION: `REQUIRED_AUTORIZATION`,
  GET_USER_ID: `GET_USER_ID`,
  GET_USER_EMAIL: `GET_USER_EMAIL`,
  GET_USER_LOGIN: `GET_USER_LOGIN`,
  GET_USER_PASSWORD: `GET_USER_PASSWORD`,
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

  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTORIZATION,
      payload: Boolean(status),
    };
  },

  getUserId: (id) => {
    return {
      type: ActionType.GET_USER_ID,
      payload: id,
    };
  },

  getUserEmail: (email) => {
    return {
      type: ActionType.GET_USER_EMAIL,
      payload: email,
    };
  },

  getUserLogin: (login) => {
    return {
      type: ActionType.GET_USER_LOGIN,
      payload: login,
    };
  },

  getUserPassword: (password) => {
    return {
      type: ActionType.GET_USER_PASSWORD,
      payload: password,
    };
  },
};

const Operation = {
  loadQuestions: () => (dispatch, _getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  },

  getAuthorization: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {
      email,
      password,
    }).then((response) => {
      dispatch(ActionCreator.requireAuthorization(response.status));
      dispatch(ActionCreator.getUserId(response.data.id));
      dispatch(ActionCreator.getUserEmail(email));
    });
  }
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

    case ActionType.REQUIRED_AUTORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case ActionType.GET_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload,
      });

    case ActionType.GET_USER_EMAIL:
      return Object.assign({}, state, {
        userEmail: action.payload,
      });

    case ActionType.GET_USER_LOGIN:
      return Object.assign({}, state, {
        userLogin: action.payload,
      });

    case ActionType.GET_USER_PASSWORD:
      return Object.assign({}, state, {
        userPassword: action.payload,
      });
  }

  return state;
};

export {
  ActionCreator,
  reducer,
  Operation,
};
