# [Lattice Paths](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-15-lattice-paths)

## Problem

> Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
>
> How many such routes are there through a given `gridSize`?

## Setup

```js
function latticePaths(gridSize) {
  // Good luck!
  return true;
}

latticePaths(4);
```

## Notice

[On the page introducing the problem](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-15-lattice-paths), you can actually see a visual describing the possible paths in the 2x2 grid. Something similar to the following:

```code
 → →     - -     - -     → -     - -     → -
|   ↓   ↓   |   ↓→ →    | ↓ |   ↓→  |   | ↓→|
|   ↓   ↓   |   |   ↓   | ↓ |   | ↓ |   |   ↓
 - -     → →     - -     - →     - →     - -
```

Just less confusing.

## Notes

Unfortunately, I encountered the problem in a math class, and remember solution using the _binomial coefficient_ of the grid size: for `x` rows and `y` columns, the number of lattice path from the origin `(0, 0)` is expressed by the following coefficient:

```
(  x + y  )
(    x    )
```

For the task at hand, `x` and `y` are one and the same, coinciding with the size of the grid. This means the solution is provided by:

```
(    2 * gridSize  )
(    gridSize      )
```

Since the binomial coefficient is solved by considering the factorial of the components

```
(n k) = n!  / (k! * (n - k)!)
```

We can therefore compute the solution as

```
2*gridSize!  / (gridSize! * gridSize!)
```

In JavaScript terms:

```js
function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
function latticePaths(gridSize) {
  return factorial(2 * gridSize) / (factorial(gridSize) * factorial(gridSize));
}
```

I decided to use the factorial function developed in a previous project, but the core of the problem is within the scope of `latticePaths`.
