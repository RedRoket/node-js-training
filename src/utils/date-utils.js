const { format, startOfWeek, addDays, previousMonday } = require('date-fns');

const DATE_FORMAT = 'yyyy-MM-dd';

const getCurrentWeek = () => {
  const today = new Date();
  const monday = format(startOfWeek(today, { weekStartsOn: 1 }), DATE_FORMAT);
  const friday = format(addDays(monday, 4), DATE_FORMAT);

  return { start: monday, end: friday };
};

const getWeek = (date) => {
  const monday = format(previousMonday(date), DATE_FORMAT);
  const friday = format(addDays(monday, 4), DATE_FORMAT);

  return { start: monday, end: friday };
};

module.exports = {
  getCurrentWeek,
  getWeek,
};
