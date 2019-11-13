import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GenreQuestionScreen} from './genre-question-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`When the user answers, the callback function gets the data in the correct format`, () => {
  const onUserAnswer = jest.fn();
  const genreQuestionScreen = shallow(<GenreQuestionScreen
    screenIndex={0}
    question={{
      type: `a`,
      genre: `rock`,
      answers: [
        {
          src: `a`,
          genre: `a`,
        },
        {
          src: `a`,
          genre: `a`,
        },
        {
          src: `a`,
          genre: `a`,
        },
        {
          src: `a`,
          genre: `a`,
        },
      ],
    }}
    onAnswer={onUserAnswer}
  />);

  const allBtnChoice = genreQuestionScreen.find(`.game__input`);
  allBtnChoice.forEach((btn) => {
    btn.simulate(`change`, {target: {checked: true}});
  });

  genreQuestionScreen.find(`form`).simulate(`submit`, {
    preventDefault: () => {}
  });

  expect(onUserAnswer).toBeCalledWith([`answer-0`, `answer-1`, `answer-2`, `answer-3`]);
});


