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

While there might be a mathematical approach finding the solution with incredible efficiency, I found this project to provide a helping of practice with the iterative process set up with `while` and `for` loops.

Let's start by considering the spiral given in the example, and most prominently the `index` of each digit found on the diagonal.

| digit | Index |
| ----- | ----- |
| 1     | 0     |
| 3     | 2     |
| 5     | 4     |
| 7     | 6     |
| 9     | 8     |
| 13    | 12    |
| 17    | 16    |
| 21    | 20    |
| 25    | 24    |

Starting with `1`, we increment the value by `2` four times. This to consider every corner of the nested grid.

Once this smaller grid is completed, we then increment the value by `4`, and again four times. This until we reach the digit completing the grid.

If we were to continue expanding the grid, we'd see that the increments then become `6`.

| digit | Index |
| ----- | ----- |
| 25    | 24    |
| 31    | 30    |
| 37    | 36    |
| 43    | 42    |
| 49    | 48    |

Each time we expand the grid, we need two additional steps to reach the diagonal.

With this in mind, we can set up a `while` and `for` loop. to keep track of all this increments.

### Loops

We set up three variables:

- `solution`, describing the cumulative value of every number in the diagonal(s)

- `counter`, describing the addition included four times for every grid

- `increment`, detailing the "step up" achieved after the four increments. This is the number which allows to reach ever so greater grids.

```js
function spiralDiagonals(n) {
  let solution = 1;

  let counter = 1;
  let increment = 2;
}
```

`solution` and `counter` are both initialized to `1`, since the grid starts with the same number. `increment` to `2`, considering the number of steps for the first grid.

We continue incrementing the variables as described in the previous sections. Until we reach the square of the input number:

```js
while (counter < n ** 2) {}
```

Four times for each "cycle" around the grid:

```js
while (counter < n ** 2) {
  for (let i = 0; i < 4; i += 1) {}
}
```

Increment the counter by the necessary number of steps, the solution by the counter instead.

```js
while (counter < n ** 2) {
  for (let i = 0; i < 4; i += 1) {
    counter += increment;
    solution += counter;
  }
}
```

Following the for loop, increment the increment itself by the mandatory `2` steps.

```js
while (counter < n ** 2) {
  for (let i = 0; i < 4; i += 1) {
    counter += increment;
    solution += counter;
  }
  increment += 2;
}
```

And that's it.

Outside of this iterative setup we find that `solution` has accumulated every number in the grid's own diagonals, and we can immediately return the value finding the solution to the problem.

```js
return solution;
```

---

I feel this problem has the potential to have a much more efficient solution. If you know about any improvement, let me know [@borntofrappe](https://twitter.com/borntofrappe).
