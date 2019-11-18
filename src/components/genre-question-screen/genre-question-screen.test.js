import React from 'react';
import renderer from 'react-test-renderer';
import {GenreQuestionScreen} from './genre-question-screen.jsx';

it(`GenreQuestionScreen correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<GenreQuestionScreen
      screenIndex={0}
      question={{
        type: `a`,
        genre: `pop`,
        answers: [
          {
            src: `a`,
            genre: `a`,
          },
          {
            src: `c`,
            genre: `c`,
          },
          {
            src: `b`,
            genre: `b`,
          },
          {
            src: `a`,
            genre: `a`,
          },
        ],
      }}
      onAnswer={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
