import React from 'react';
import renderer from 'react-test-renderer';
import {Mistakes} from './mistakes.jsx';

it(`Mistakes correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<Mistakes
      mistakes={1}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
