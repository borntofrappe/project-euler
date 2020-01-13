# [Summation of Primes](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-10-summation-of-primes)

## Problem

> The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
>
> Find the sum of all the primes below `n`.

## Setup

```js
function primeSummation(n) {
  // Good luck!
  return true;
}

primeSummation(2000000);
```

## Notice

In this folder you find three files describing as many approaches to the challenge. The scripts beginning with `failure` describe logic that is sound, but impractical when considering large input values. I still decided to maintain the code to accurately describe my journey toward the actual solution, failures included. In light of this, be warned that the notes do describe a less than linear path to the code described in `script.js`.

## Notes

Prime numbers have appeared on several occasions during the #projecteuler100 challenge. I actually seem to remember that in problem #7 I was able to also describe the array of prime numbers below an arbitrary threshold using recursion as well. I certainly remember that it came with a `RangeError`, so let's take it one step at a time.

### `for` loop

Let's start with a `for` loop and then see if recursion can improve the situation at a later stage.

```js
function primeSummation(n) {
  const primes = [];
  for (let i = 2; i < n; i += 1) {
    if (!primes.find(prime => i % prime === 0)) {
      primes.push(i);
    }
  }
}
```

The idea is to collect prime numbers leveraging previous prime numbers. As we discovered in a previous challenge, primes are the ultimate factor; this means that if a number cannot be evenly divided by any prime number coming before it, it must be a prime number itself.

Once every prime number has been stored in the `primes` array, we add up all the values with a handy `reduce` function.

```js
function primeSummation(n) {
  const primes = [];
  for (let i = 2; i < n; i += 1) {
    if (!primes.find(prime => i % prime === 0)) {
      primes.push(i);
    }
  }
  return primes.reduce((acc, curr) => acc + curr, 0);
}
```

The logic is sound, as you can effectively attest with a series of values:

```js
console.log(primeSummation(17)); // 41
console.log(primeSummation(2001)); // 277050
```

That being said, the code does not clear the challenge. In the moment the function is tested with a value of `2000000`, the freeCodeCamp platform preemptively terminates the function highlighting a potential infinite loop.

### Recursion

I don't have great expectations, as again, the last time I tried this solution I ended up with a `RangeError`, but it's all good practice.

```js
function primes(n) {
  if (n < 2) {
    return [];
  }
  const previousPrimes = primes(n - 1);
  const isNotPrime = previousPrimes.find(prime => n % prime === 0);
  return isNotPrime ? [...previousPrimes] : [n, ...previousPrimes];
}
```

In the base case, for `n` describing a value smaller than the first known prime number, we return an empty array. In the recursive case, we consider the array describing the existing, if any, prime numbers, and check if `n` can be evenly divided by one of them. If it can, we know that `n` cannot be prime, so we plainly return the array describing the prime numbers for the smaller value. If it can't, we include the newly found prime number at the beginning of the array.

This effectively allows to build an array in which the prime numbers up to `n` are stored in descending order.

```js
primes(17); // [17, 13, 11, 7, 5, 3, 2]
```

To describe the values in ascending order, you'd have to append `n` to the array describing the previous values.

```diff
-[n, ...previousPrimes]
+[...previousPrimes, n]
```

But since we care about the sum, either way works.

With this recursive function we can build the array of primes below the input `n` and add them together through the `reduce` function.

```js
function primeSummation(n) {
  function primes(n) {
    if (n < 2) {
      return [];
    }
    const previousPrimes = primes(n - 1);
    const isNotPrime = previousPrimes.find(prime => n % prime === 0);
    return isNotPrime ? [...previousPrimes] : [n, ...previousPrimes];
  }

  return primes(n - 1).reduce((acc, curr) => acc + curr, 0);
}
```

Once again, it works.

```js
primeSummation(17); // 41
```

Once again however, it does fail when the input number increases to a sizable value.
