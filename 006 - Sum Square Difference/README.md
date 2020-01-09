# [Sum Square Difference](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-6-sum-square-difference)

## Problem

> The sum of the squares of the first ten natural numbers is,
>
> 1^2 + 2^2 + ... + 10^2 = 385
>
> The square of the sum of the first ten natural numbers is,
>
> (1 + 2 + ... + 10)^2 = 55^2 = 3025
>
> Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
>
> Find the difference between the sum of the squares of the first n natural numbers and the square of the sum.

## Setup

```js
function sumSquareDifference(n) {
  // Good luck!
  return true;
}

sumSquareDifference(100);
```

## Notes

Let's start by considering a few arbitrary values:

| Input | Sum of the squares | Square of the sum | Difference |
| ----- | ------------------ | ----------------- | ---------- |
| 2     | 1^2 + 2 ^ 2 = 5    | (1+2)^2 = 9       | 4          |
| 3     | 14                 | 36                | 22         |
| 4     | 30                 | 100               | 70         |
| 5     | 55                 | 225               | 170        |
| 6     | 91                 | 441               | 350        |
| 7     | 140                | 784               | 644        |
| 8     | 204                | 1296              | 1092       |
| 9     | 285                | 2025              | 1740       |
| 10    | 385                | 3025              | 2640       |

Looking specifically at the _difference_ column, and the difference between each subsequent entry, I noticed something entertaining.

Each increment can be described as the square of the input number times the number coming before it: `n^2*(n-1)`.

| Difference | Delta | Result   |
| ---------- | ----- | -------- |
| 4          | 4     | 2^2 \*1  |
| 22         | 18    | 3^2\*2   |
| 70         | 48    | 4^2\*3   |
| 170        | 100   | 5^2\*4   |
| 350        | 180   | 6^2\*5   |
| 644        | 294   | 7^2\*6   |
| 1092       | 448   | 8^2\*7   |
| 1740       | 648   | 9^2\*8   |
| 2640       | 900   | 100^2\*9 |

I may go on a limb here, but perhaps this relation might actually provide the solution. Since the difference increases at a rate of `n^2*(n-1)`, we solve the problem by recursively considering smaller and smaller values, each time adding the value described by the newfound expression.

```js
function sumSquareDifference(n) {
  if (n === 1) {
    return 0;
  } else {
    return n ** 2 * (n - 1) + sumSquareDifference(n - 1);
  }
}

sumSquareDifference(100); // 25164150
```

In the base case, recursion ends by returning `0`. In the recursion call, the input number is squared, multiplied by the number coming before it and the result is added to the same operation applied on the earlier integer.

We are essentially traversing the delta column, from `1` up to `n`.

Notice that I used `**` to square the input number. `n ** 2` achieves the same result as `Math.pow(n, 2)`, but I just discovered the operator and wanted to change things up a bit.

---

To be completely honest, I didn't expect to find a solution by fiddling with a few arbitrary values. If you are a math major, you might be appalled by this approach, and have a formula to justify the relationship more scientifically. Feel free to reprimand me [@borntofrappe](https://twitter.com/borntofrappe).
