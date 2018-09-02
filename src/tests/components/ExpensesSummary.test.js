import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Should render ExpensesSummary without expense correctly', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={0} expensesTotal={0}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpensesSummary with 1 expense correctly', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={60000}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpensesSummary with many expenses correctly', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={2160050}/>);
  expect(wrapper).toMatchSnapshot();
});
