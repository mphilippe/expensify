import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import {
  startAddExpense,
  addExpense,
  startEditExpense,
  editExpense,
  startRemoveExpense,
  removeExpense,
  startSetExpenses,
  setExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);
const uid = 'aaa';
const defAuthState = {
  auth: { uid }
};

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  db.ref(`users/${uid}/expenses`).set(expensesData)
    .then(() => done());
});

test('Should setup remove expense action object', () => {
  const id = 'a';
  const action = removeExpense({ id });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id
  });
});

test('Should remove expenses from Firebase', (done) => {
  const store = createMockStore(defAuthState);
  const id = expenses[0].id;
  store.dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });
      return db.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.exists()).toBe(false);
      done();
    });
});

test('Should setup edit expense action object', () => {
  const updates = {
    description: 'Test',
    amount: 6000
  };
  const id = 'a';
  const action = editExpense(id, updates);
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates
  });
});

test('Should edit expenses from Firebase', (done) => {
  const store = createMockStore(defAuthState);
  const id = expenses[0].id;
  const updates = {
    description: 'Test',
    note: 'Test',
    // createdAt: 1000000,
    // amount: 200
  };
  store.dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
      return db.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
        ...updates
      });
      done();
    });
});

test('Should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  })
});

test('Should add expense to DB and store', (done) => {
  const store = createMockStore(defAuthState);
  const expenseData = {
    description: 'Rent',
    note: 'January month',
    amount: 1350000,
    createdAt: 1000
  };
  store.dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('Should add expense with defaults to DB and store', (done) => {
  const store = createMockStore(defAuthState);
  const defaultData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };
  store.dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...defaultData
        }
      });
      return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(defaultData);
      done();
    });
});

test('Should setup set expenses action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('Should fetch the expenses from Firebase', (done) => {
  const store = createMockStore(defAuthState);
  store.dispatch(startSetExpenses())
    .then(() => {
      const actions = store.getActions();
      // const state = store.getState();
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      });
      // expect(state).toEqual(expenses);
      done();
    });
});
