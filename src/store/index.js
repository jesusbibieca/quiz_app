import { action, createStore, thunk } from 'easy-peasy';
import helpers from '../helpers';
import contants from '../constants';

const QuizModel = {
  users: {
    data: [],
    getUsers: thunk(async (actions) => {
      try {
        const response = await fetch(contants.API_URL);
        const data = await response.json();

        actions.setUsers(helpers.parseApiResponse(data.results));
      } catch (error) {
        console.error(error);
        throw new Error('There seems to be a problem with our API');
      }
    }),
    setUsers: action((state, payload) => {
      state.data = payload;
    })
  },
  usersNames: [],
  questions: {
    correctCount: 0,
    currentQuestion: 0,
    incorrectCount: 0,
    incrementCorrectAnswers: action((state) => {
      state.correctCount++;
    }),
    incrementIncorrectAnswers: action((state) => {
      state.incorrectCount++;
    }),
    incrementCurrentQuestion: action((state) => {
      state.currentQuestion++;
    })
  },
  notification: {
    open: false,
    severity: 'info',
    message: 'Test message!',
    toggle: action((state) => {
      state.open = !state.open;
    }),
    setContent: action((state, payload) => {
      state.severity = payload.severity;
      state.message = payload.message;
    })
  }
};

const store = createStore(QuizModel);

export default store;
