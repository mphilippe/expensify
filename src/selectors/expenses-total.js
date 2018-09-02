export default (expenses) => {
  if (expenses.length === 0) {
    return 0;
  } else {
    // return expenses.reduce((total, v) => {
    //   return total + v.amount;
    // }, 0);
    return expenses
      .map((expense) => expense.amount)
      .reduce((total, v) => total + v, 0);
  }
};
