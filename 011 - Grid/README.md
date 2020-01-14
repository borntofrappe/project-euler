# [Largest Product in a Grid](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-11-largest-product-in-a-grid)

## Problem

> In the 20×20 grid below, four numbers along a diagonal line have been marked in red.
>
> const grid = [...]
>
> The product of these numbers is 26 × 63 × 78 × 14 = 1788696. What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in a given `arr` grid?

## Setup

```js
function largestGridProduct(arr) {
  // Good luck!
  return arr;
}

// Only change code above this line
const grid = [...];

const testGrid = [
  [40, 17, 81, 18, 57],
  [74, 4, 36, 16, 29],
  [36, 42, 69, 73, 45],
  [51, 54, 69, 16, 92],
  [7, 97, 57, 32, 16]
];

largestGridProduct(testGrid);
```

## Notice

I included the smaller of the two data structures in the setup section. The larger 2D array was quite obtrusive so I opted to replace it with an ellipsis `...`.
