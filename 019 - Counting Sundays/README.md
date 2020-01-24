# [Counting Sundays](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-19-counting-sundays)

## Problem

> You are given the following information, but you may prefer to do some research for yourself.
>
> 1 Jan 1900 was a Monday.
> Thirty days has September,
> April, June and November.
> All the rest have thirty-one,
> Saving February alone,
> Which has twenty-eight, rain or shine.
> And on leap years, twenty-nine.
> A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
> How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?

## Setup

```js
function countingSundays(firstYear, lastYear) {
  // Good luck!
  return true;
}

countingSundays(1943, 1946);
```

## Notes

This is one of those problems that is bound to have a solution `n`-th times more efficient, but let's try to develop the project with a series of functions. Even if inefficient, it might be a teaching effort.

### isLeapYear

With a first function we can return a boolean describing if the input year is a leap year. This will come in handy to dictate whether or not February is meant to have `28` or `29` days.

```js
const isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
```

The first condition is quite clear, and the function immediately returns `false` if the input year cannot be evenly divided by `4`.

The second condition is a tad murky, but if we consider that `year` must be divisible by `4` to reach it, it becomes easier to understand.

- if it can't be divided by `100`, it returns `true`

- if it can be divided by `100`, but it is divisible by `400` as well, it also returns `true`

The only way the condition between parenthesis returns `false` is when year is divisible by `100` and not `400`, as specified in the conditions above.

Testing the function out with a couple of values:

```js
isLeapYear(1900); // false
isLeapYear(2000); // true
isLeapYear(1968); // true
isLeapYear(1966); // false
```

### firstDay

This function is meant to return the day of the week for the first of January of the input year. Assuming, as prefaced by the project, that the first January of 1900 was a monday.

```js
const firstDay = year => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  let days = 0;
  for (let i = 1900; i < year; i += 1) {
    days += isLeapYear(i) ? 366 : 365;
  }

  return weekDays[days % 7];
};
```

We count the number of days since 1990, and return the day using the modulo operator. With a value evenly divisible by `7`, for instance, the function would return Monday.

```js
firstDay(1900); // "Monday"
firstDay(1901); // "Tuesday"
firstDay(1904); // "Friday"
```

### firstDays

Using `firstDay` and `isLeapYear`, we can develop a function returning the first day of every month for the input year.

Since we need the `weekDays` array however, it might make sense to update `firstDay` in the first place.

We start by retrieving the first day of the input year. This is the first of January and provides the first value.

```js
const firstDays = year => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  let days = 0;
  for (let i = 1900; i < year; i += 1) {
    days += isLeapYear(i) ? 366 : 365;
  }
  const january = weekDays[days % 7];
};
```

Building from an array describing the months, we can then find the weekdays which follow using the cumulative number of days.

```js
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
```

Notice that we do not actually need the `31` days of December, as accounting for the month will lead toward the year which follows.

For a couple of arbitrary values, for instance:

```js
firstDays(1900); // ["Monday", "Thursday", "Thursday", "Sunday", "Tuesday", "Friday", "Sunday", "Wednesday", "Saturday", "Monday", "Thursday", "Saturday"]
```

### countingSundays

Coming back to the function given in the setup, we can hopefully tie in everything together. "All" that is necessary is a for loop to retrieve the first day for multiple years.

```js
function countingSundays(firstYear, lastYear) {
  const days = [];
  for (let year = firstYear; year <= lastYear; year += 1) {
    days.push(...firstDays(year));
  }
}
```

A `reduce` function can then increment a counter if the day of the month is a Sunday.

```js
return days.reduce((acc, curr) => (curr === "Sunday" ? acc + 1 : acc), 0);
```
