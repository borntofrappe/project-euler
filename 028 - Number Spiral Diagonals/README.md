# [Number Spiral Diagonals](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-28-number-spiral-diagonals)

## Problem

> Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:
>
> 21 22 23 24 25
>
> 20 \7 \8 \9 10
>
> 19 \6 \1 \2 11
>
> 18 \5 \4 \3 12
>
> 17 16 15 14 13
>
> It can be verified that the sum of the numbers on the diagonals is 101.
>
> What is the sum of the numbers on the diagonals in a n by n spiral formed in the same way?

## Setup

```js
function spiralDiagonals(n) {
  // Good luck!
  return n;
}

spiralDiagonals(1001);
```

## Notice

I added backslash characters in the grid displaying the numbers to align the values with a single digit in the same column of the two-digit values in the first and last row.

## Notes

// 2-4-6-8
// 12-16-20-24
// 30-36-42-48
// 58-68-78-88
