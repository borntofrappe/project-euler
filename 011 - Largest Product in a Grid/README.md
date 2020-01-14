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

## Notes

This problem seems like a direct sequel to the eighth challenge, in which the task was to find the largest product in a series. In that instance, a `reduce` function made for quite the elegant solution.

```js
thousandDigits.reduce(
  (acc, curr, index, arr) => {
    const digits = arr.slice(index - n, index);
    const product = digits.reduce((acc, curr) => acc * curr, 1);

    return acc.product > product
      ? acc
      : {
          digits,
          product
        };
  },
  {
    digits: [],
    product: 0
  }
);
```

Loop through the array and compute the product of the `n` adjacent digits, updating the initial object `{digits, product}` only if the new value surpassed the previous one. I now realize the approach can be improved by limiting the number of checks necessary, but the logic is sound, and can be hopefully repeated in the current problem.

### P8 Update

I mentioned the `reduce` function created for the eighth problem can be improved, so let's start with that. Currently, the function goes through a series of unnecessary checks, when the `digits` array is made to consider less than `n` adjacent values.

Let me argument: consider an instance in which we consider `4` adjacent digits, for the array `[1, 5, 7, 3, 5, 7, 2]`.

- in the first iteration, `reduce` considers the subset `[1]` and computes the product of the current items (as there is only one, the result remains the same value)

  ```js
  {
    digits: [1],
    product: 1
  }
  ```

- in the iteration which follows, it considers `[1, 5]`, computes the product and finding it a greater value, updates the object.

  ```js
  {
    digits: [1, 5],
    product: 5
  }
  ```

This continues as the function consider a larger and larger subset, until it builds an array `n` digits long.

Since the smaller subsets can be at most equal to the ones which follow, considering them it's unnecessary. It'd be better to start already with an initial array describing `4` adjacent digits, in other words `[1, 5, 7 ,3]`.

For the same reason, the checks should stop with the last `4` adjacent numbers, `[3, 5, 7, 2]`, and the function should not consider bother computing the product of `[5, 7, 2]`, `[7, 2]` and finally `[2]`.

In practical terms, it means we can use a `for` loop with a more efficient solution. I'll recreate the function with a smaller array to prove the point.

```js
function largestProductinaSeries(n) {
  let tenDigits = [7, 3, 1, 6, 7, 1, 7, 6, 5, 3];
  const { length } = tenDigits;
  let solution = 0;
  for (let i = n; i < length - n; i += 1) {
    const digits = tenDigits.slice(i - n, i);
    const product = digits.reduce((acc, curr) => acc * curr, 1);
    if (solution < product) {
      solution = product;
    }
  }
  return product;
}
largestProductinaSeries(4);
```

After the `for` loop, `product` is sure to describe the greatest possible value of any array `n` characters long. We complete the task set up through the `reduce` function, but faster.

### P11 Comeback

The problem at hand describes a multidimensional array, a 2D array to be precise, and we must be sure to check the product of `n` adjacent digits in any direction.

Let's start by considering the horizontal values, left to right, or right to left for that matter.

```js
function largestGridProduct(arr) {
  const ADJACENT_DIGITS = 4;
  let solution = 0;
  arr.forEach(row => {
    for (let j = ADJACENT_DIGITS; j < row.length; j += 1) {
      const productRow = row.slice(j - ADJACENT_DIGITS, j).reduce((acc, curr) => acc * curr, 1);
      if (solution < productRow) {
        solution = productRow;
      }
    }
  });

  return solution;
}
```

For the test grid:

```js
largestGridProduct(testGrid); // 7615944
```

Which accurately describes the product of `36*42*69*73`, in the third row.

The challenge now becomes how to check the numbers vertically, and also diagonally. Here's an idea: instead of modifying the code within the `for` loop, why not extending the array on which the `forEach` is set up.

The idea is to describe a larger array contemplating, always with an array, the different columns and diagonals.

### Columns

Starting with the columns, we can retrieve them by using a `map` function on the input array and returning the `n`-th item of each row:

```js
const testGrid = [
  [40, 17, 81, 18, 57],
  [74, 4, 36, 16, 29],
  [36, 42, 69, 73, 45],
  [51, 54, 69, 16, 92],
  [7, 97, 57, 32, 16]
];

const columns = Array(testGrid.length)
  .fill()
  .map((value, index) => testGrid.map(row => row[index]));
```

We'll get to the diagonals hopefully in a moment, but to illustrate the approach, now that we have the columns:

```js
[
  [40, 74, 36, 51, 7],
  [17, 4, 42, 54, 97],
  [81, 36, 69, 69, 57],
  [18, 16, 73, 16, 32],
  [57, 29, 45, 92, 16]
];
```

We extend the surface area of the `forEach` function, thusly considering the product of `n` digits in two directions.

```js
function largestGridProduct(arr) {
  const ADJACENT_DIGITS = 4;
  let solution = 0;
  const columns = Array(testGrid.length)
    .fill()
    .map((value, index) => testGrid.map(row => row[index]));

  [...arr, ...columns].forEach(row => {
    for (let j = ADJACENT_DIGITS; j < row.length; j += 1) {
      const productRow = row.slice(j - ADJACENT_DIGITS, j).reduce((acc, curr) => acc * curr, 1);
      if (solution < productRow) {
        solution = productRow;
      }
    }
  });

  return solution;
}
```

For `testGrid`, the code updates the previous value as follows:

```js
largestGridProduct(testGrid); // 13883076
```

`13883076` as in the product of the numbers included in the third column: `[ 81, 36, 69, 69 ]`.

"All" is left is extending the initial array to consider the diagonals.
