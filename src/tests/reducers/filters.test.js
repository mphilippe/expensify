import FiltersReducer from '../../reducers/filters';
import moment from 'moment';

test('Should setup default filter values', () => {
  const state = FiltersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should setup sort by to amount', () => {
  const state = FiltersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('Should setup sort by to date', () => {
  const currentState = {
    text: undefined,
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const state = FiltersReducer(currentState, { type: 'SORT_BY_DATE' });
  expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
  const text = 'aa';
  const state = FiltersReducer(undefined, {
    type: 'SET_TEXT_FILTER',
    text
  });
  expect(state.text).toBe(text);
});

test('Should start date filter', () => {
  const date = moment();
  const state = FiltersReducer(undefined, {
    type: 'SET_START_DATE',
    date
  });
  expect(state.startDate).toEqual(date);
});

test('Should end date filter', () => {
  const date = moment();
  const state = FiltersReducer(undefined, {
    type: 'SET_END_DATE',
    date
  });
  expect(state.endDate).toEqual(date);
});
