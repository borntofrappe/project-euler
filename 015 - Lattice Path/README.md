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
