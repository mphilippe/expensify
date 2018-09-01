import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('Should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm with data correctly', () => {
 const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
 expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  // expect(wrapper.find('p').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = 'New description';
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('Should set note on textarea change', () => {
 const wrapper = shallow(<ExpenseForm/>);
 const value = 'New note';
 wrapper.find('textarea').simulate('change', {
   target: { value }
 });
 expect(wrapper.state('note')).toBe(value);
});

test('Should set amount if valid input', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = '221.25';
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('Should not set amount if invalid input', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = '123.123';
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('0');
});

test('Should call onSubmit for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[1].description,
    note: expenses[1].note,
    amount: expenses[1].amount,
    createdAt: expenses[1].createdAt
  });
});

test('Should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const now = moment();
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('Should set calendarFocused on date focus', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const focused = true;
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});
