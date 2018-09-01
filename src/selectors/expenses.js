import moment from 'moment';

export default (expenses, {
  text,
  sortBy,
  startDate,
  endDate
}) => {
  text = text.toLowerCase();
  return expenses.filter((expense) => {
    const createdAt = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAt, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAt, 'day') : true;
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
