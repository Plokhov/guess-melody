import React from 'react';
import renderer from 'react-test-renderer';
import {AudioPlayer} from './audio-player.jsx';

it(`AudioPlayer correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<AudioPlayer
      src={`a`}
      isPlaying={false}
      onPlayButtonClick={jest.fn()}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
