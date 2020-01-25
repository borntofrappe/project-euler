# [Factorial Digit Sum](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-20-factorial-digit-sum)

## Problem

> n! means n × (n − 1) × ... × 3 × 2 × 1
>
> For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
> and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
>
> Find the sum of the digits `n!`

## Setup

```js
function sumFactorialDigits(n) {
  // Good luck!
  return n;
}

sumFactorialDigits(100);
```

## Notes

Unfortunately, it is not enough to compute the factorial and add up the newfound digits.

```js
const factorial = n => {
  if (n <= 1) {
    return 1;
  }

  return n * factorial(n - 1);
};

function sumFactorialDigits(n) {
  const factor = factorial(n);
  return `${factor}`.split("").reduce((acc, curr) => acc + parseInt(curr, 10), 0);
}
```

This might work for small numbers.

```js
sumFactorialDigits(5); // 3 as in 1+2+0
sumFactorialDigits(10); // 27 as in 3+6+2+8+8+0+0
```

But once we reach higher values, the function doesn't return the desired value.

```js
sumFactorialDigits(50); // NaN
```

It returns `NaN` since the factorial of `50` is computed with exponent notation, as `3.0414093201713376e+64`.
