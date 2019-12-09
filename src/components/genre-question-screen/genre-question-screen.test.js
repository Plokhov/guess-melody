import React from 'react';
import renderer from 'react-test-renderer';
import {GenreQuestionScreen} from './genre-question-screen.jsx';

it(`GenreQuestionScreen correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<GenreQuestionScreen
      screenIndex={0}
      question={{
        type: `genre`,
        genre: `pop`,
        answers: [
          {
            id: `1`,
            src: `a`,
            genre: `pop`,
          },
          {
            id: `2`,
            src: `c`,
            genre: `pop`,
          },
          {
            id: `3`,
            src: `b`,
            genre: `pop`,
          },
          {
            id: `4`,
            src: `a`,
            genre: `pop`,
          },
        ],
      }}
      onAnswer={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
