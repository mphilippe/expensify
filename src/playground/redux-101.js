import { createStore } from 'redux';

const incrementCount = ({ count = 1 } = {}) => ({
  type: 'INCREMENT',
  count
});
const decrementCount = ({ count = 1 } = {}) => ({
  type: 'DECREMENT',
  count
});
const setCount = ({ count = 1 } = {}) => ({
  type: 'SET',
  count
});
const resetCount = () => ({
  type: 'RESET'
});

// 1. Reducers are pure functions (own scope only)
// 2. Never change state or action

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.count
      };
      break;
    
    case 'DECREMENT':
      return {
        count: state.count - action.count
      };
      break;
    
    case 'SET':
      return {
        count: action.count
      };
      break;

    case 'RESET':
      return {
        count: 0
      };
      break;

    default:
      return state;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ count: 5 }));
// unsubscribe();
store.dispatch(decrementCount());
store.dispatch(decrementCount({ count: 5 }));
store.dispatch(resetCount());
store.dispatch(incrementCount({ count: 25 }));
store.dispatch(setCount({ count: 5 }));
