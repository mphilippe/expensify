import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT'});
  expect(state).toEqual([]);
});

test('Should remove an expense that exists', () => {
  const action = { 
    type: 'REMOVE_EXPENSE',
    id: 'aaa'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test('Should not remove an expense that does not exist', () => {
  const action = { 
    type: 'REMOVE_EXPENSE',
    id: 'qwerty'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('Should edit an expense that exists', () => {
  const description = 'Tea';
  const amount = 8000;
  const action = { 
    type: 'EDIT_EXPENSE',
    id: 'aaa',
    updates: {
      description,
      amount
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([{
    ...expenses[0],
    description,
    amount
  }, expenses[1], expenses[2]]);
});

test('Should not remove an expense that does not exist', () => {
  const action = { 
    type: 'EDIT_EXPENSE',
    id: 'qwerty',
    updates: {
      description: 'Tea',
      amount: 8000
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('Should add an expense', () => {
  const expense = {
    id: 'ddd',
    description: 'Museum visit',
    amount: 15000,
    createdAt: 1000,
    note: ''
  };
  const action = { 
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});
