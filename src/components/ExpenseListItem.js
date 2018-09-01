import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeExpense } from '../actions/expenses';

export const ExpenseListItem = ({ id, description, note, amount, createdAt, dispatch }) => (
  <div>
    <h3><Link to={`/edit/${id}`}>{description}</Link></h3>
    {note && <p>{note}</p>}
    <p>{createdAt} - {amount}</p>
    <button onClick={(e) => {
      dispatch(removeExpense({
        id
      }));
    }}>Remove</button>
  </div>
);

export default connect()(ExpenseListItem);
