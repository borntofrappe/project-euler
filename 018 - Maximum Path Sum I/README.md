# [Maximum Path Sum I](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-18-maximum-path-sum-i)

## Problem

> By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.
>
> ```
>      3
>    7   4
>  2   4   6
> 8  5   9   3
> ```
>
> That is, 3 + 7 + 4 + 9 = 23.
>
> Find the maximum total from top to bottom of the triangle below:
>
> ...
>
> **NOTE**: As there are only 16384 routes, it is possible to solve this problem by trying every route. However, Problem 67, is the same challenge with a triangle containing one-hundred rows; it cannot be solved by brute force, and requires a clever method.

## Setup

```js
function maximumPathSumI(triangle) {
  // Good luck!
  return true;
}

const testTriangle = [
  [3, 0, 0, 0],
  [7, 4, 0, 0],
  [2, 4, 6, 0],
  [8, 5, 9, 3]
];

maximumPathSumI(testTriangle);
```

## Notice

As with previous problems, I made the decision not to include the entire data structure, as it'd clutter the introduction to the problem.

## Notes

The idea is to walk through the rows and compute the sum of the values and the numbers coming earlier in the data structure. Let me walk you the example provided above, one row at a time, to try and explain what I mean.

```
3
7 4
2 4 6
8 5 9 3
```

Starting from the second row, `7` and `4` can be incremented by the previous value.

```
10 7
2 4 6
8 5 9 3
```

Continuing with the third row however, we find that `4` can be incremented by `10` and `7` alike. A prime use case for an array.

```
12 [14 11] 13
8 5 9 3
```

`14` as in`10+4` and `11` as in `7+4`. Keeping the values in an array means we still have a row with three items, even if those items can actually describe two values.

Continuing with the fourth row, we continue adding up the necessary values.

```
20 [17 19 16] [23 20 22] 16
```

The two arrays now describe the possible values of `5` and `9`. To be pedantic, they describe the following sums:

- For `5`:

  - `17 = 12 + 5`
  - `19 = 14 + 5`
  - `16 = 11 + 5`

  Using the possible numbers describe in the array in the previous row, `[14 11]`.

- For `9`:

  - `23 = 14+9`
  - `20 = 11+9`
  - `22 = 13+9`

  Again, considering the previous array, but this time in conjunction with the number `13`

Hopefully, the approach is clear enough. Once we reach the final row, we are left to consider the greatest value between the available numbers. In this instance `23`, which provides the solution to the specific problem.

## Loops and Arrays

With the basic approach sketched out, let's try to implement the logic in code.

It helps to have a separate data structures in which to describe the additions.

```js
function maximumPathSumI(triangle) {
  const sums = triangle.map(row => row.map(cell => (cell ? [cell] : 0)));
}
```

You might have noticed I created an array using the input values, but nested each individual value in an array. `3` becomes `[3]`, `7` becomes `[7]`. This makes it slightly easier to add the numbers through the rows, as it is no longer necessary to check if the previous row describes an array or an integer. There are always array, and we can increment the current value by every item of these data structures. This even if the array has only one item, as it happens for the first item in each row.

Looping through the data structure, we can then update the values with the logic mentioned earlier.

We can actually start with the second row, as we need to add the values with the number in the row above.

```js
function maximumPathSumI(triangle) {
  const sums = triangle.map(row => row.map(cell => (cell ? [cell] : 0)));

  for (let i = 1; i < sums.length; i += 1) {}
}
```

For each row then, we then update the individual array with the sum of the current value, and the values above.

```js
function maximumPathSumI(triangle) {
  const sums = triangle.map(row => row.map(cell => (cell ? [cell] : 0)));

  for (let i = 1; i < sums.length; i += 1) {
    for (let j = 0; j < sums[i].length; j += 1) {
      const current = sums[i][j];
      const northWest = sums[i - 1][j - 1];
      const northEast = sums[i - 1][j];
    }
  }
}
```

Notice that `current`, `northWest` and `northEast` actually describe arrays:

- `current` is an array with one item, representing the current value in the row

- `northWest` is an array detailing the possible values of the number in the previous row and previous index

- `northEast` the possible values in the previous row and with the same index.

We consider the previous and current index because, looking back at the top-down triangle, the actual order of in the array is slightly misleading.

In the top down triangle we sum for instance `3+7+4`

```
      3
    7   4
  2   4   6
8   5   9   3
```

Which in the array are found at the `0,0,1` indexes.

```js
[
  [3 0 0 0]
  [7 4 0 0]
  [2 4 6 0]
  [8 5 9 30]
]
```

Once we find these arrays, if we find these arrays for that matter, we can loop through the existing values incrementing the number by the current value.

```js
function maximumPathSumI(triangle) {
  const sums = triangle.map(row => row.map(cell => (cell ? [cell] : 0)));

  for (let i = 1; i < sums.length; i += 1) {
    for (let j = 0; j < sums[i].length; j += 1) {
      const current = sums[i][j];
      const northWest = sums[i - 1][j - 1];
      const northEast = sums[i - 1][j];

      sums[i][j] = [];
      const currentValue = current[0];
      if (northWest) {
        sums[i][j] = [...sums[i][j], ...northWest.map(value => value + currentValue)];
      }
      if (northEast) {
        sums[i][j] = [...sums[i][j], ...northEast.map(value => value + currentValue)];
      }
    }
  }
  return sums;
}
```

It might look convoluted, but essentially we are replacing the existing value with an array describing all possible additions. Additions with the number(s) coming in the previous rows and in both directions.

Past the for loop(s), we should now have an array describing the sums after each iteration.

```js
const testTriangle = [
  [3, 0, 0, 0],
  [7, 4, 0, 0],
  [2, 4, 6, 0],
  [8, 5, 9, 3]
];

maximumPathSumI(testTriangle);
```

| Row | Sums                                       |
| --- | ------------------------------------------ |
| 0   | `[[3], 0, 0, 0]`                           |
| 1   | `[[10], [7], [], []]`                      |
| 2   | `[[12], [14, 11], [13], []]`               |
| 3   | `[[20], [17, 19, 16], [23, 20, 22], [16]]` |

We get empty arrays instead of `0` because we are actually considering the current value also if this is a zero. As this is unnecessary, we can improve the for loop by considering the northern values only if the current value is a positive integer.

```js
for (let i = 1; i < sums.length; i += 1) {
  for (let j = 0; j < sums[i].length; j += 1) {
    const current = sums[i][j];
    // safety check
    if (current) {
      const northWest = sums[i - 1][j - 1];
      const northEast = sums[i - 1][j];

      sums[i][j] = [];
      const currentValue = current[0];
      if (northWest) {
        sums[i][j] = [...sums[i][j], ...northWest.map(value => value + currentValue)];
      }
      if (northEast) {
        sums[i][j] = [...sums[i][j], ...northEast.map(value => value + currentValue)];
      }
    }
  }
}
```

Regardless of this improvement, the last array describes all the possible addition values. We can then retrieve the maximum between the available numbers and find the solution to the problem at hand.

There are several ways to find the greatest item in an array, but it is first necessary to flatten the last row.

```js
const flat = sums[sums.length - 1].reduce((acc, curr) => [...acc, ...curr], []);
```

With the flat array, we can sort the numbers in ascending order and return the first item, or use `Math.max`, knowing that the function accepts numbers instead of arrays.

```js
return Math.max(...flat);
```

## Wrap Up

The explanation was quite verbose, but the underlying approach is straightforward: add all the possible values looping through the input array one row at a time. Return the greatest value. The implementation was more challenging, but was a great way to practice with nested for loops and nested arrays.

---

I am actually tempted to see if this solution works for the problem 67 as well, but I'll try to save what promises to be a tougher challenge in about two months' time. If you have a better solution, let me know [@borntofrappe](https://twitter.com/borntofrappe). Just don't spoil #67, for now.
