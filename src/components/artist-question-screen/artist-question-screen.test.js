import React from 'react';
import renderer from 'react-test-renderer';
import {ArtistQuestionScreen} from './artist-question-screen.jsx';

it(`ArtistQuestionScreen correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<ArtistQuestionScreen
      screenIndex={0}
      question={{
        type: `a`,
        song: {
          artist: `a`,
          src: `a`,
        },
        answers: [
          {
            picture: `a`,
            artist: `a`,
          },
          {
            picture: `b`,
            artist: `b`,
          },
          {
            picture: `c`,
            artist: `c`,
          },
        ],
      }}
      onAnswer={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
