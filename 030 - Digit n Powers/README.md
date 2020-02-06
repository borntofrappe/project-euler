# [Digit n Powers](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-30-digit-n-powers)

## Problem

> Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:
>
> 1634 = 1^4 + 6^4 + 3^4 + 4^4
>
> 8208 = 8^4 + 2^4 + 0^4 + 8^4
>
> 9474 = 9^4 + 4^4 + 7^4 + 4^4
>
> As 1 = 1^4 is not a sum it is not included.
>
> The sum of these numbers is 1634 + 8208 + 9474 = 19316.
>
> Find the sum of all the numbers that can be written as the sum of `n` powers of their digits.

## Setup

```js
function digitnPowers(n) {
  // Good luck!
  return n;
}

digitnPowers(5);
```

## Notice

The code described in both scripts gives rise to a potential infinite loop. When testing the project [on the freeCodeCamp platform](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-30-digit-n-powers) however, the code passes the tests, albeit slowly. In the developer console both approaches actually produce the desired result, and rather rapidly. The logic seems to be sound, but inefficient.
