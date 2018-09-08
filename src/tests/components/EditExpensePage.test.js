import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, startEditExpense, startRemoveExpense, history;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = {
    push: jest.fn()
  };
  wrapper = shallow(<EditExpensePage
    expense={expenses[0]}
    startEditExpense={startEditExpense}
    startRemoveExpense={startRemoveExpense}
    history={history}
  />);
});

test('Should render EditExpensePage properly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should handle startEditExpense correctly', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('Should handle startRemoveExpense correctly', () => {
  wrapper.find('button').simulate('click');
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id);
  expect(history.push).toHaveBeenLastCalledWith('/');
});
