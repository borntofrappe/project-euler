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

---

The code described above seems to clear the challenge, but the testing suite @freeCodeCamp describes a potential infinite loop on line `4`, the one setting up the loop. I might put a pin on the project and come back after a bit of research.
