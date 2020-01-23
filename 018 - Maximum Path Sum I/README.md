# [Maximum Path Sum I](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-18-maximum-path-sum-i)

## Problem

> By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.
>
> **3**
>
> **7** 4
>
> 2 **4** 6
>
> 8 5 **9** 3
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

As with previous problems, I made the decision not to include the entire data structure, as it'd clutter the introduction to the problem. The smaller example describing the `3 + 7 + 4 + 9 = 23` sum is also displayed with the layout of a rectangle triangle. Ultimately, I found this layout to be more descriptive than the top-down isosceles triangle [displayed on the freeCodeCamp platform](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-18-maximum-path-sum-i). It saves the hassle of including whitespace, and it matches the structure of the actual array more closely.
