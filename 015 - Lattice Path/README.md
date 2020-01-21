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

## Improvements

The previous code already passes the tests set up for the challenge, but there is an improvement in the way we compute the division between the factorials. Consider for instance a grid size of `4`. In this instance the solution is computed as:

```
8*7*6*5*4*3*2*1 / (4*3*2*1 * 4*3*2*1)
```

We can actually simplify that expression as follows:

```
8*7*6*5 / 4*3*2*1
```

We need a way to preemptively terminate the factorial function with a desired value, and by rewriting the `factorial` function, we can achieve this by specifying an additional argument.

```js
function factorial(n, threshold = 1) {
  if (n <= threshold) {
    return 1;
  }
  return n * factorial(n - 1, threshold);
}
```

With the inclusion of a default value, it means the function can be called as earlier and still return the factorial of the input number. With the additional parameter, the method will terminate earlier and provide the result of the multiplication of any number from `n` down to `threshold`.

This means the solution can be updated as follows:

```js
function factorial(n, threshold = 1) {
  if (n <= threshold) {
    return 1;
  }
  return n * factorial(n - 1, threshold);
}
function latticePaths(gridSize) {
  return factorial(2 * gridSize, gridSize) / factorial(gridSize);
}
```

---

Even though the problem was spoiled by previous knowledge, I was able to further explore the JavaScript syntax describing a function. If you know about an alternative approach however, I am pretty curious as to how you considered the paths on the grid (or half of the grid?). Let me know [@borntofrappe](https://twitter.com/borntofrappe).
