import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import '../config/numeral.js';
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';

// export const ExpensesSummary = (props) => (
//   <div>
//     {props.expenses.length === 0 ? (
//       <p>No expense</p>
//     ) : (
//       <p>
//         Viewing {props.expenses.length} 
//         expense{props.expenses.length > 1 ? 's' : ''} 
//         totalling 
//         {numeral(expensesTotal(props.expenses) / 100).format('$0,0[.]00')}
//       </p>
//     )}
//   </div>
// );

// const mapStateToProps = (state) => ({
//   expenses: selectExpenses(state.expenses, state.filters)
// });

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = 'expense' + (expenseCount > 1 ? 's' : '');
  const formattedTotal = numeral(expensesTotal / 100).format('$0,0[.]00');
  return (
    <div>
      {expenseCount === 0 ? (
        <p></p>
      ) : (
        <p>
          Viewing {expenseCount} {expenseWord} totalling {formattedTotal}
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: expensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
