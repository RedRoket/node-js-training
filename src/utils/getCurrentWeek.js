const { format, startOfWeek, addDays } = require('date-fns');

const getCurrentWeek = () => {
    const today = new Date();
    const monday = format(startOfWeek(today, {weekStartsOn: 1}), 'yyyy-MM-dd');
    const friday = format(addDays(monday, 4), 'yyyy-MM-dd');

    return { start: monday, end: friday };
};

module.exports = getCurrentWeek;