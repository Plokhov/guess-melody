import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AudioPlayer} from './audio-player.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`AudioPlayer can switch his state when song has started`, () => {
  const clickHandler = jest.fn();
  const audioPlayer = shallow(<AudioPlayer
    src={`https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`}
    isPlaying={false}
    onPlayButtonClick={clickHandler}
  />,
  {
    createNodeMock: () => {
      return {
        oncanplaythrough: null,
        onplay: null,
        onpause: null,
        ontimeupdate: null,
        src: ``
      };
    }
  });

  const trackButton = audioPlayer.find(`.track__button`);

  audioPlayer.setState({isLoading: false});
  expect(audioPlayer.state().isLoading).toEqual(false);

  trackButton.simulate(`click`);
  expect(audioPlayer.state().isPlaying).toEqual(true);

  trackButton.simulate(`click`);
  expect(audioPlayer.state().isPlaying).toEqual(false);
});
