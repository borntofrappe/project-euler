# [Smallest multiple](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-5-smallest-multiple)

## Problem

> 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
>
> What is the smallest positive number that is evenly divisible by all of the numbers from 1 to `n`?

## Setup

```js
function smallestMult(n) {
  // Good luck!
  return true;
}

smallestMult(20);
```

## Notes

I am reminded of prime numbers, the ultimate factors as discovered in [problem 3](), but in this instance, they might not be the end of it all. Indeed, consider how a number can be a multiple of of a prime number like `2`, but also not a multiple for a multiple of `2`, like `4`. In less confusing terms:

```js
6 % 2 === 0; // true
6 % 4 === 0; // false
```

Obvious, but worth spelling out.

The might not provide the solution, but might lead me closer to it. The next best idea I have is considering whether the multiple for `n` is a multiple for `n-1`, `n-2` and so forth, excluding those values for which `n` is already a multiple. In other words: in a situation for which the number is a multiple of `6`, the function should not consider `3` nor `2`. Looks like a prime use-case for _recursion_, but I'm puzzled as to how to implement this logic.

```js
function smallestMult(n) {
  const uniqueFactors = [];
  for (let i = n; i > 1; i -= 1) {
    const isFactor = uniqueFactors.find(factor => factor % i === 0);
    if (!isFactor) {
      uniqueFactors.push(i);
    }
  }

  let value = n;
  while (!uniqueFactors.every(factor => value % factor === 0)) {
    value += n;
  }
  return value;
}
```

## Rewrite

Primes comeback.

```js
function smallestMult(n) {
  const primes = [];
  for (let i = 2; i <= n; i += 1) {
    const isMultiple = primes.find(prime => i % prime === 0);
    if (!isMultiple) {
      primes.push(i);
    }
  }

  const uniqueFactors = [];
  for (let i = n; i > Math.floor(n / 2); i -= 1) {
    const isFactor = uniqueFactors.find(factor => factor % i === 0);
    if (!isFactor) {
      uniqueFactors.push(i);
    }
  }

  const primesProduct = primes.reduce((acc, curr) => acc * curr, 1);
  let solution = primesProduct;
  while (!uniqueFactors.every(factor => solution % factor === 0)) {
    solution += primesProduct;
  }
  return solution;
}
```

---
