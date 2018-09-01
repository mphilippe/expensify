import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

test('Should filter by text value', () => {
  const filters = {
    text: 'c',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'date'
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

test('Should filter by start date', () => {
  const filters = {
    text: '',
    startDate: moment(0),
    endDate: undefined,
    sortBy: 'date'
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

test('Should filter by end date', () => {
  const filters = {
    text: '',
    startDate: undefined,
    endDate: moment(0),
    sortBy: 'date'
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test('Should sort by date', () => {
  const filters = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'date'
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('Should sort by amount', () => {
  const filters = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
