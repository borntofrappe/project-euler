# [10001st Prime](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-7-10001st-prime)

## Problem

> By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
>
> What is the `n`-th prime number?

## Setup

```js
function nthPrime(n) {
  // Good luck!
  return true;
}

nthPrime(10001);
```

## Notes

I need to research more on prime numbers, but with a first, let's call it "brute force", approach, I might be tempted to set up a loop to literally consider as many as `n` prime numbers, and finally return the last found value.

```js
function nthPrime(n) {
  const primes = [];
  let candidate = 1;
  while (primes.length < n) {
    candidate += 1;
    if (!primes.find(prime => candidate % prime === 0)) {
      primes.push(candidate);
    }
  }
  return primes[n - 1];
}
```

Here I use a an array to collect the values, and lean on the definition of prime numbers to identify one. If `candidate` can be divided by a prime number, then it cannot be a prime itself.

Starting with a value of `2`, the loop considers `2`, `3`, skips `4` to then consider `5` and continues until the array has `n` items. Outside of the loop, the `return` statement refers to the very last item in the array (remember arrays are zero-based indexed, so that `primes[n]` will result in an off-by-one error).

The code described above seems to clear the challenge, but the testing suite @freeCodeCamp highlights a potential infinite loop on line `4`.

## Update

I see no other way to test whether a number is prime than by finding whether or not it can be divided by a value different from `1` or itself.

I found a way to recursively describe prime numbers:

```js
const nthPrimes = n => {
  if (n === 1) {
    return [2];
  }
  const primes = nthPrimes(n - 1);
  let candidate = primes[0];
  while (primes.find(prime => candidate % prime === 0)) {
    candidate += 1;
  }
  return [candidate, ...primes];
};

nthPrimes(5); // [11, 7, 5, 3, 2]
```

A bit mind-bending, but leverages the same condition specified in the earlier `if` statement. Once a prime number is found, it is included at the beginning of the array, and the function looks for the next value.

Included in the testing suite, it actually gives rise to a full-blown error message: `RangeError: Maximum call stack size exceeded`.

```js
function nthPrime(n) {
  const nthPrimes = n => {
    if (n === 1) {
      return [2];
    }
    const primes = nthPrimes(n - 1);
    let candidate = primes[0];
    while (primes.find(prime => candidate % prime === 0)) {
      candidate += 1;
    }
    return [candidate, ...primes];
  };

  return nthPrimes(n)[0];
}

nthPrime(1000); // 7919
nthPrime(10000); // Uncaught RangeError: Maximum call stack size exceeded
```

It'd be actually interesting to find the threshold after which the error message gets displayed (between `8000` and `9000`, I'll spare you the futile exercise).

---

The exploration detailed in the update section lead me toward a dead-end. We have a working solution described right before it, but there's also that message about a potential infinite loop. If you know how to fix this, feel free to drop a hint [@borntofrappe](https://twitter.com/borntofrappe).
