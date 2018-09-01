import { combineReducers, createStore } from 'redux';
import uuid from 'uuid';

// Actions
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const editExpense = ({ id, updates } = {}) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
});
const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
});


// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
      break;

    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
      break;
    
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
      break;
    
    default:
      return state;
  }
};

// Filters Reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
      break;

    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
      break;

    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
      break;

    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date
      };
      break;

    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date
      };
      break;

    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, {
  text,
  sortBy,
  startDate,
  endDate
}) => {
  text = text.toLowerCase();
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = text.length === 0 || (expense.note.toLowerCase().includes(text) || expense.description.toLowerCase().includes(text));

    return startDateMatch && endDateMatch && textMatch;
  })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expense1 = store.dispatch(addExpense({
  description: 'Rent',
  amount: 1260000,
  createdAt: 1000
}));
const expense2 = store.dispatch(addExpense({
  description: 'Grocery',
  amount: 300000,
  createdAt: -1000
}));

// store.dispatch(removeExpense({ id: expense1.expense.id }));
// store.dispatch(editExpense({
//   id: expense2.expense.id,
//   updates: { amount: 460000 }
// }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(-125));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(125));
// store.dispatch(setEndDate());

const demoState = {
  expenses: [{
    id: 'asdjsdhnlqwj',
    description: 'January Rent',
    note: 'Final payment for that address',
    amount: 1300000,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
};
