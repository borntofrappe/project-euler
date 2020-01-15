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

After the `for` loop, `product` is sure to describe the greatest possible value of any array `n` characters long. We complete the task set up through the `reduce` function, but more efficiently.

### P11 Comeback

The problem at hand describes a multidimensional array, a 2D array to be precise, and we must be sure to check the product of `n` adjacent digits in any direction.

Let's start by considering the horizontal values.

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

### Diagonals

In order to prevent unnecessary checks, diagonals should consider only `n` adjacent values. The tricky part is that we do need to run across the 2D array considering multiple rows, but hopefully, this can be achieved with a `for` loop or two. I'd like to use a `map` function similarly to the columns, but as always, one step at a time.

The idea is to loop through the rows, from the first until the last possible row which can fabricate a diagonal of `n` adjacent digits (therefore until `length - n`). For each item of the arrays then, we set up a loop to consider the adjacent digits, on successive rows. Here's the kicker: as we loop through the individual rows, we consider the current index to decide which diagonal to actually consider.

It might be best to explain with `testGrid`:

```js
const testGrid = [
  [40, 17, 81, 18, 57],
  [74, 4, 36, 16, 29],
  [36, 42, 69, 73, 45],
  [51, 54, 69, 16, 92],
  [7, 97, 57, 32, 16]
];
```

Starting with the first row and first item, `40`, we need to consider the diagonal going south-east: `[40, 4, 69, 16]`. When we reach `18`, or the last item for that matter, this direction is no longer irrelevant, and leaves its place to the south-west diagonal: `[18, 36, 42, 51]`.

Let's see how to implement this logic in code:

```js
const ADJACENT_DIGITS = 4;
for (let i = 0; i <= testGrid.length - ADJACENT_DIGITS; i += 1) {
  const row = testGrid[i];
  for (let j = 0; j < row.length; j += 1) {
    if (j <= row.length - ADJACENT_DIGITS) {
      // south-east
    }
    if (j >= ADJACENT_DIGITS - 1) {
      // south-west
    }
  }
}
```

Notice that there are two separate `if` statements, as there might be an instance in which there is a diagonal in both direction. This doesn't happen in the `5x5` test grid, but it certainly occurs with the `20x20` behemoth tested afterwards.

Also notice that in the second `if` statement we consider the south-west diagonal if `j` is greater than or equal to `ADJACENT_DIGITS - 1`. This is because arrays are zero-based indexed and when we already reach the third digit we can consider the four preceding values: `arr[0][3]`, `arr[1][2]`, `arr[2][1]` and `arr[3][0]`.

To extract the individual diagonal, we set up a loop considering the adjacent digits. I'll illustrate the point for the first direction:

```js
if (j <= row.length - ADJACENT_DIGITS) {
  const diagonal = Array(ADJACENT_DIGITS)
    .fill("")
    .map((value, index) => testGrid[i + index][j + index]);
}
```

The most important portion of the snippet relates to the index(es) identifying the desired digit. `i+index` allows to retrieve the rows in order, from the current row down until the one `4` digits away. `j+index` allows to then traverse the rows horizontally, picking the values in the desired order.

For the opposite direction, the logic repeats itself, with a diminishing index:

```js
if (j >= ADJACENT_DIGITS - 1) {
  const diagonal = Array(ADJACENT_DIGITS)
    .fill("")
    .map((value, index) => testGrid[i + index][j - index]);
}
```

With a larger array in which to store the individual arrays, we can condense the previous snippets to find the diagonals for `testGrid`:

```js
const testGrid = [
  [40, 17, 81, 18, 57],
  [74, 4, 36, 16, 29],
  [36, 42, 69, 73, 45],
  [51, 54, 69, 16, 92],
  [7, 97, 57, 32, 16]
];

const diagonals = [];
const columns = [];
const ADJACENT_DIGITS = 4;

for (let i = 0; i <= testGrid.length - ADJACENT_DIGITS; i += 1) {
  const row = testGrid[i];
  for (let j = 0; j < row.length; j += 1) {
    if (j <= row.length - ADJACENT_DIGITS) {
      const diagonal = Array(ADJACENT_DIGITS)
        .fill("")
        .map((value, index) => testGrid[i + index][j + index]);
      diagonals.push(diagonal);
    }
    if (j >= ADJACENT_DIGITS - 1) {
      const diagonal = Array(ADJACENT_DIGITS)
        .fill("")
        .map((value, index) => testGrid[i + index][j - index]);
      diagonals.push(diagonal);
    }
  }
}
```

Following the rather verbose `for` loop, `diagonals` becomes an array of `8` arrays, accurately describing the diagonals of the first two rows.

```js
[
  [40, 4, 69, 16],
  [17, 36, 73, 92],
  [18, 36, 42, 51],
  ...
];
```

### Rows and Columns

Unfortunately, it is not enough to include the diagonals to find the final solution.

```js
[...arr, ...columns, ...diagonals].forEach(row => {});
```

This is because diagonals already describe the possible `n` adjacent values. To consider the product, we no longer need to slice the array, as we did for the columns and rows. In light of this, we can either differentiate the way we consider the diagonals, or extend the logic used for the diagonals to find the rows and columns of strictly `n` adjacent numbers. By doing so, we can finally compute the greatest product with `reduce` functions, no slice required.

```js
[...rows, ...columns, ...diagonals].reduce((acc, curr) => {
  const product = curr.reduce((acc, curr) => acc * curr, 1);
  return acc > product ? product : acc;
}, 0);
```

Let's build the different arrays with a few thoroughly commented snippets. We start setting up three arrays in which to store the `n` adjacent digits in the specified directions.

```js
function largestGridProduct(arr) {
  const ADJACENT_DIGITS = 4;
  const rows = [];
  const columns = [];
  const diagonals = [];
}
```

It is actually unnecessary to divvy them up by direction, but it helps to illustrate the logic that follows. Ultimately, all that is required is a single array in which to store every possible subset.

We proceed with a for loop, iterating the input array.

```js
for (let i = 0; i <= arr.length; i += 1) {
  // build the rows, columns and diagonals
}
```

We then loop through the nested arrays, to contemplate the possible values.

```js
for (let i = 0; i <= arr.length; i += 1) {
  for (let j = 0; j < arr[i].length; j += 1) {
    // arr[i][j] refers to the individual values
  }
}
```

As we need to consider only `n` adjacent values (`4` to be precise), we can populate the `rows` array up until `j` describe the length of the row minus the desired digits.

```js
for (let i = 0; i <= arr.length; i += 1) {
  for (let j = 0; j < arr[i].length; j += 1) {
    // rows
    if (j <= arr[i].length - ADJACENT_DIGITS) {
      const row = Array(ADJACENT_DIGITS)
        .fill("")
        // same row, different column
        .map((value, index) => arr[i][j + index]);
      rows.push(row);
    }
  }
}
```

For the columns, we traverse the array vertically, and this time stop when `i` exceeds the value which guarantees an array of `n` items.

```js
for (let i = 0; i <= arr.length; i += 1) {
  for (let j = 0; j < arr[i].length; j += 1) {
    if (j <= arr[i].length - ADJACENT_DIGITS) {
      const row = Array(ADJACENT_DIGITS)
        .fill("")
        .map((value, index) => arr[i][j + index]);
      rows.push(row);
    }

    // columns
    if (i <= arr[i].length - ADJACENT_DIGITS) {
      const column = Array(ADJACENT_DIGITS)
        .fill("")
        // different row, same column
        .map((value, index) => arr[i + index][j]);
      columns.push(column);
    }
  }
}
```

And finally for the diagonals, we can actually include the code developed in the section titled with the same name.

```js
for (let i = 0; i < arr.length; i += 1) {
  for (let j = 0; j < arr[i].length; j += 1) {
    if (j <= arr[i].length - ADJACENT_DIGITS) {
      const row = Array(ADJACENT_DIGITS)
        .fill("")
        .map((value, index) => arr[i][j + index]);
      rows.push(row);
    }

    if (i <= arr[i].length - ADJACENT_DIGITS) {
      const column = Array(ADJACENT_DIGITS)
        .fill("")
        .map((value, index) => arr[i + index][j]);
      columns.push(column);

      // diagonals
      if (j <= arr[i].length - ADJACENT_DIGITS) {
        const diagonal = Array(ADJACENT_DIGITS)
          .fill("")
          // different rows and columns (down and to the right)
          .map((value, index) => testGrid[i + index][j + index]);
        diagonals.push(diagonal);
      }
      if (j >= ADJACENT_DIGITS - 1) {
        const diagonal = Array(ADJACENT_DIGITS)
          .fill("")
          // different rows and columns (down and to the left)
          .map((value, index) => testGrid[i + index][j - index]);
        diagonals.push(diagonal);
      }
    }
  }
}
```

I included the diagonals alongside the columns because the two are constrained by the same vertical limitation. They should both stop when we reach an index `i` which no longer guarantees a complete array.

That was a mouthful. Hopefully though, included in the body of the function, it does lead to a working solution.

### Wrap Up

This was definitely a roundabout way to close the problem, but the code does work:

```js
largestGridProduct(testGrid); // 14169081
largestGridProduct(grid); // 70600674
```

---

As mentioned, differentiating between rows, columns and diagonals in unnecessary, and we could add the desired data structure in a single array. Hopefully though, this explicit code makes for a more understandable solution. If you have other suggestions, I log on twitter almost every day, [@borntofrappe](https://twitter.com/borntofrappe).
