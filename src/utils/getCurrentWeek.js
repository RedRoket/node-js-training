const dateFns = require('date-fns');

const getCurrentWeek = () => {
    const today = new Date();
    const monday = dateFns.startOfWeek(today, {weekStartsOn: 1});
    const friday = dateFns.addDays(monday, 4);
    const formatDate = (date) => new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];

    return { start: formatDate(monday), end: formatDate(friday) };
};

module.exports = getCurrentWeek;