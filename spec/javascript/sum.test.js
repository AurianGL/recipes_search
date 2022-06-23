import React from 'react';
import renderer from 'react-test-renderer';

import {MyForm} from 'src/components/Form';

test('rendered component', () => {
  const component = renderer.create(<MyForm/>)
    
  expect(component.toJSON()).toMatchSnapshot();
});