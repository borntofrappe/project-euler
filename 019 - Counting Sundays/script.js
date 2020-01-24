const isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

const firstDays = year => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  let days = 0;
  for (let i = 1900; i < year; i += 1) {
    days += isLeapYear(i) ? 366 : 365;
  }
  const january = weekDays[days % 7];

  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year)) {
    months[1] = 29;
  }

  const cumulative = months.reduce((acc, curr, index) => (index > 0 ? [...acc, curr + acc[index - 1]] : [...acc, curr]), []);

  const firstDays = cumulative.map(d => weekDays[(days + d) % 7]);
  return [january, ...firstDays.slice(0, -1)];
};

function countingSundays(firstYear, lastYear) {
  const days = [];
  for (let year = firstYear; year <= lastYear; year += 1) {
    days.push(...firstDays(year));
  }
  return days.reduce((acc, curr) => (curr === "Sunday" ? acc + 1 : acc), 0);
}

countingSundays(1901, 2000);
