# [Smallest multiple](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-5-smallest-multiple)

## ⚠️ Be Advised ⚠️

In this repo you find two scripts:

- `failure.js` describes a rather reckless and inefficient approach, which still seems to work for smaller `n` values

- `script.js` builds on top of the existing logic to provide a more efficient, and hopefully valid, solution

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

I am reminded of prime numbers, the ultimate factors as discovered in [problem 3](https://github.com/borntofrappe/project-euler/tree/master/003%20-%20Largest%20Prime%20Factor), but in this instance, they might not be the end of it all. Indeed, consider how a number can be a multiple of a prime number like `2`, but also not a multiple for a multiple of `2`, like `4`. In less confusing terms:

```js
6 % 2 === 0; // true
6 % 4 === 0; // false
```

Obvious, but worth spelling out.

Primes might not provide the solution, but might lead me closer to it. The next best idea I have is considering whether the multiple for `n` is a multiple for `n-1`, `n-2` and so forth, excluding those values for which `n` is already a multiple. In other words: in a situation for which the number is a multiple of `6`, the function should not consider `3`, nor `2`. Looks like a use-case for _recursion_, but I'm puzzled as to how to implement this logic.

Let's try with a loop or two:

```js
function smallestMult(n) {
  // describe an array of unique factors
  // for n = 6 for instance, the idea is to skip 2 and 3, to consider "only" 4, 5, 6
  // effectively the array considers every after before Math.floor(n / 2)
  const uniqueFactors = [];
  for (let i = n; i > 1; i -= 1) {
    const isFactor = uniqueFactors.find(factor => factor % i === 0);
    if (!isFactor) {
      uniqueFactors.push(i);
    }
  }

  // initialize a value equal to the input value
  let value = n;
  // as long as the value cannot be divided evenly by each and every factor
  while (!uniqueFactors.every(factor => value % factor === 0)) {
    // increment by the input value
    // effectively considering n, n*2, n*3...
    value += n;
  }

  // return the newfound, smallest multiple
  return value;
}
```

This clears the challenge, but a warning describes a potential infinite loop on line `16`. This is where we consider the unique factors and continue adding the input value.

## Rewrite

While testing different values, I started to re-consider prime numbers. Consider this: the smallest multiple must be at least equal to the product of the prime numbers. This is because said primes cannot be divided in smaller numbers.

From this realization, a new approach:

- find the prime numbers up to, and including, `n`

- consider the product of these primes

- starting from the product, check if the remaining numbers are evenly divisible by said product

- continue adding the product (product _ 2, product _ 3) until a solution is found

This approach can actually include part of the logic described in the first solution. By considering the unique factors, and perhaps those which are not already considered in the primes set, we can cut down to the number of checks necessary to find the solution.

```js
function smallestMult(n) {
  // array of primes up to n
  const primes = [];
  for (let i = 2; i <= n; i += 1) {
    const isMultiple = primes.find(prime => i % prime === 0);
    if (!isMultiple) {
      primes.push(i);
    }
  }

  // array of factors for which smallestMultiple / factor must provide a null remainder
  const uniqueFactors = [];
  for (let i = n; i > Math.floor(n / 2); i -= 1) {
    const isFactor = uniqueFactors.find(factor => factor % i === 0);
    // do not consider prime numbers
    if (!isFactor && !primes.includes(i)) {
      uniqueFactors.push(i);
    }
  }

  // start from the product of the prime numbers
  const primesProduct = primes.reduce((acc, curr) => acc * curr, 1);
  let solution = primesProduct;
  // continue adding the product until every unique factor is evenly divisible
  while (!uniqueFactors.every(factor => solution % factor === 0)) {
    solution += primesProduct;
  }
  return solution;
}
```

---

I'm less than confident about the validity of the solution as perhaps I should be. Running the function through the [freeCodeCamp](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-5-smallest-multiple) testing suite clears every test; the console doesn't highlight a potential infinite loop either. That being said, as I found a better approach with prime numbers, I am positive there is another mathematical consideration which can solve the problem more efficiently and with a much better structure. Feel free to bother me [@borntofrappe](https://twitter.com/borntofrappe) about this.
