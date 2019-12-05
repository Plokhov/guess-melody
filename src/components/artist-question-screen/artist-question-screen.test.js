import React from 'react';
import renderer from 'react-test-renderer';
import {ArtistQuestionScreen} from './artist-question-screen.jsx';

it(`ArtistQuestionScreen correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<ArtistQuestionScreen
      screenIndex={0}
      question={{
        type: `artist`,
        song: {
          artist: `a`,
          src: `ab`,
        },
        answers: [
          {
            id: `1`,
            picture: `a`,
            artist: `a`,
          },
          {
            id: `2`,
            picture: `b`,
            artist: `b`,
          },
          {
            id: `3`,
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
