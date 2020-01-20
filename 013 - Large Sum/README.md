# [Large Sum](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-13-large-sum)

## Problem

> Work out the first ten digits of the sum of the following one-hundred 50-digit numbers.
>
> 37107287533902....

## Setup

```js
function largeSum(arr) {
  // Good luck!
  return true;
}

// only change code above this line

const testNums = ["37107287533902102798797998220837590246510135740250", "46376937677490009712648124896970078050417018260538"];

largeSum(testNums);
```

## Notice

As in a previous problem describing an array of ten thousand digits, I made the decision not to display the entirety of the sequence. On the [freeCodeCamp platform](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-13-large-sum) you can attest the validity of the solution on the larger data structure.

## Notes

As with previous challenges, I am forced to immediately doubt the most direct approach. Let's investigate why that is, however.

Consider the following snippet:

```js
function largeSum(arr) {
  const total = arr.map(val => parseInt(val)).reduce((acc, curr) => acc + curr, 0);

  return total;
}
```

In this instance we are looping through the array to coerce the strings into integers, and then return the total using the renowned reduce function.

If you were to display the total for the test array, you'd already see the fallacy in the code.

```js
largeSum(testNums); // 8.348422521139211e+49
```

The number is provided in exponent notation, and if we were to display the first ten characters of the equivalent string, we'd get something akin to `8.34842252`.

Not the solution, but also not that far from it. At first I tossed this "immediate" approach on the side and started to consider a series of loops to add the columns from the last to the first. Something similar to how additions are solved in elementary school.

```code
159  +
321
---
480
```

I'd add every column and then consider the first ten digits.

However, seeing the expression `8.34842252` makes me think the most direct approach is actually viable. After all, we care only about the first ten digits. In this situation we can actually strip the decimal point out of the string, and consider the very ten digits from the start.

```js
return total
  .toString()
  .replace(".", "")
  .slice(0, 10);
```

And surprisingly enough, it works. Even for the larger array.

---

Coming on the heels of problem 12, which made me stutter for a couple of days, this is one of the most refreshing solution developed in the #projecteuler100 challenge so far. It's not that scientific, but it's nonetheless beautiful in its simplicity. It's also a helpful reminder to question one's own assumptions.

If you have explored the addition by columns, or any alternative approach for that matter, feel free to tell me about it [@borntofrappe](https://twitter.com/borntofrappe).
