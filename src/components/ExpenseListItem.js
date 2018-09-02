import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import '../config/numeral.js';
import { removeExpense } from '../actions/expenses';

export const ExpenseListItem = ({ id, description, note, amount, createdAt, dispatch }) => (
  <div>
    <h3>
      <Link to={`/edit/${id}`}>{description}</Link>
    </h3>
    {note && <p>{note}</p>}
    <p>
      {numeral(amount / 100).format('$0,0[.]00')}
      -
      {moment(createdAt).format('DD-MM-YYYY')}
    </p>
    <button onClick={(e) => {
      dispatch(removeExpense({
        id
      }));
    }}>Remove</button>
  </div>
);

export default connect()(ExpenseListItem);
