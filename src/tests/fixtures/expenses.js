import moment from 'moment';

export default [
  {
    id: 'aaa',
    description: 'coffee',
    amount: 6000,
    createdAt: 0,
    note: ''
  },
  {
    id: 'bbb',
    description: 'rent',
    amount: 1300000,
    createdAt: moment(0).subtract(4, 'days').valueOf(),
    note: ''
  },
  {
    id: 'ccc',
    description: 'grocery',
    amount: 400000,
    createdAt: moment(0).add(4, 'days').valueOf(),
    note: 'Weekly grocery'
  }
];
