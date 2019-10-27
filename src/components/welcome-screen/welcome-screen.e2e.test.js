import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`When you click on the start button of the game will be called callback`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<WelcomeScreen
    time={0}
    errorCount={0}
    onClick={clickHandler}
  />);

  const startButton = app.find(`button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
