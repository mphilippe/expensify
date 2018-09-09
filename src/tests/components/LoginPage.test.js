import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

let startLogin, wrapper;

beforeEach(() => {
  startLogin = jest.fn();
  wrapper = shallow(<LoginPage startLogin={startLogin} />);
});

test('Should render login page properly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should call start login on button click', () => {
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});
