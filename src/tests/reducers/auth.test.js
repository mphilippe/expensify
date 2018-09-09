import authReducer from '../../reducers/auth';

test('Should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('Should setup uid on login', () => {
  const uid = 'aaa';
  const action = {
    type: 'LOGIN',
    uid
  }
  const state = authReducer({}, action);
  expect(state).toEqual({ uid });
});

test('Should clear uid on logout', () => {
  const state = authReducer({ uid: 'aaa' }, {type: 'LOGOUT'});
  expect(state).toEqual({});
});
