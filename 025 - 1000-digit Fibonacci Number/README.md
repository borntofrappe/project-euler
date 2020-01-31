# [1000-digit Fibonacci Number](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-25-1000-digit-fibonacci-number)

## Problem

> The Fibonacci sequence is defined by the recurrence relation:
>
> Fn = (Fn−1) + (Fn−2), where F1 = 1 and F2 = 1.
>
> Hence the first 12 terms will be:
>
> `1 1 2 3 5 8 13 21 34 55 89 144`
>
> The `12`-th term, `144`, is the first term to contain three digits.
>
> What is the index of the first term in the Fibonacci sequence to contain `n` digits?

## Setup

```js
function digitFibonacci(n) {
  // Good luck!
  return n;
}

digitFibonacci(3); // 12
```

## Notes

To be completely honest, I am stunned to have found the solution in the most direct approach possible. Let me argument how I went about solving the problem at hand.

Starting with an array describing the first two digits, the idea is to build Fibonacci's sequence until the very last item reaches the input number of characters.

```js
function digitFibonacci(n) {
  const digits = [1, 1];
}
```

Instead of coercing the integers to string values and evaluating the length of said structure, we can actually conjure up the desired threshold using the exponent of `10`. Most precisely, elevating `10` by `n-1`. This quick table should illustrate why.

| n   | `10 ** (n-1)` | Number of digits |
| --- | ------------- | ---------------- |
| 1   | 10 ^ 0 = 1    | 1                |
| 2   | 10 ^ 1 = 10   | 2                |
| 3   | 10 ^ 2 = 100  | 3                |
| 4   | 10 ^ 3 = 1000 | 4                |

Therefore, as long as the last number in the `digits` array is less than the newfound threshold, we can continue appending values to Fibonacci's sequence.

```js
function digitFibonacci(n) {
  const digits = [1, 1];
  while (digits[digits.length - 1] <= 10 ** (n - 1)) {
    // continue fibonacci's sequence
  }
}
```

For the new value, we need to identify the last two digits in the array, and we can actually use a negative integer in the `slice()` function. This allows to pick and choose the items from the very end of the array.

What's more, we can use array destructuring to immediately store the last two digits in two separate variables.

```js
function digitFibonacci(n) {
  const digits = [1, 1];
  while (digits[digits.length - 1] <= 10 ** (n - 1)) {
    const [a, b] = digits.slice(-2);
  }
}
```

Almost beautiful in how concise it is. What's left is appending the sum of the two values to the `digits` array.

```js
function digitFibonacci(n) {
  const digits = [1, 1];
  while (digits[digits.length - 1] <= 10 ** (n - 1)) {
    const [a, b] = digits.slice(-2);
    digits.push(a + b);
  }
}
```

And that's basically it. Once Fibonacci's number is `n` digits long, the loop stops and we are left with a `digits` array describing every number in the sequence up to the final value.

Returning the length of the array finally provides the solution.

```js
function digitFibonacci(n) {
  const digits = [1, 1];
  while (digits[digits.length - 1] <= 10 ** (n - 1)) {
    const [a, b] = digits.slice(-2);
    digits.push(a + b);
  }
  return digits.length;
}
```

## Wrap Up

You can actually return the `digits` array to analyze Fibonacci's sequence up to the desired value.

```js
return digits;
```

It certainly helped me to avoid a one-off error, as I briefly considered returning `digits.length - 1`. Looking twice at the project description however, it's clear that we count the numbers in Fibonacci's sequence starting with F1.

---

If you were to find a more efficient solution, I'd be much interested in knowing about your approach. Let me know [@borntofrappe](https://twitter.com/borntofrappe).
