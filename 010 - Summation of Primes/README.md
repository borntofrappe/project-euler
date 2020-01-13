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

### Sieve of Eratosthenes

Following the advice received in the Discord channel for #projecteuler100, I went about to research a more efficient approach in the algorithm described by the [_Sieve of Eratosthenes_](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes).

The idea is to find prime numbers, and at the same time mark as _composite_ every multiple of these values. Consider if you will:

- prime: 2

- composite: 4, 6, 8, 10...

Intuitively, this cuts down on the number of checks which need to be performed after each iteration. When you consider the following prime number, you look for the next value that is not already considered in either array; in this instance, `3`.

- new prime: 3

- new composite: 9, 15, 21...

It's trivial to continue, but the idea is to continue marking composite values until the very last possible prime number. At this point, you return the sum of only those items marked as prime.

Let's see how this logic can actually be implemented. We need two pieces of information:

- the numbers from `2` up to `n`

- a boolean dictating whether the numbers are prime or not.

```js
function primeSummation(n) {
  const numbers = Array(n - 2)
    .fill("")
    .map((value, index) => ({
      isPrime: true,
      number: index + 2
    }));
}
```

Initially, every number is dubbed as prime. The idea is rather similar to the logic whereby prime numbers are added to the empty array one at a time:

- consider the first value as prime;

- switch the boolean for every multiple of this number to `false`

- repeat for the next number in the array with a boolean set to `true`

Let's set up the `for` loops to achieve this operation.

In the first loop, we increment a variable `i` from `2` to `n`.

```js
for (let i = 2; i < n; i += 1) {}
```

In the second, nested loop consider the multiples of `i`, starting from `i*2` and incrementing by `i` until we reach the input `n` value.

```js
for (let i = 2; i < n; i += 1) {
  for (let j = i * 2; j < n; j += i) {}
}
```

Now, in the nested loop we target the items of the array and toggle the `isPrime` boolean to `false`

```js
for (let i = 2; i < n; i += 1) {
  for (let j = i * 2; j < n; j += i) {
    numbers[j - 2].isPrime = false;
  }
}
```

`j - 2` since we are starting the outer loop with the first known prime number. Tying everything together, the logic works, and allows to build an array in which only the prime numbers have a boolean set to `true`.

```js
function primeSummation(n) {
  const numbers = Array(n - 2)
    .fill("")
    .map((val, index) => ({
      isPrime: true,
      number: index + 2
    }));

  for (let i = 2; i < Math.sqrt(n); i += 1) {
    for (let j = i * 2; j < n; j += i) {
      numbers[j - 2].isPrime = false;
    }
  }
  return numbers;
}
```

For `primeSummation(8)` for instance, we retrieve the following data structure:

| index | isPrime | Number |
| ----- | ------- | ------ |
| 0     | true    | 2      |
| 1     | true    | 3      |
| 2     | false   | 4      |
| 3     | true    | 5      |
| 4     | false   | 6      |
| 5     | true    | 7      |

The structure can be improved tremendously however.

### Improvements

A first improvement relates to _when_ we toggle the multiples to `false`; currently, we consider every multiple of `i`, regardless of whether `i` is prime or not. It is only necessary to go through the nested for loop if `i` is prime though, which leads us to the first update:

```js
for (let i = 2; i < n; i += 1) {
  if (numbers[i - 2].isPrime) {
    for (let j = i * 2; j < n; j += i) {
      numbers[j - 2].isPrime = false;
    }
  }
}
```

It'd be pointless to consider the multiples of `4` _after_ we took care of the multiples of `2` after all. That holds true for every non-prime number.

Moving on to the for loops, the starting and ending conditions can be likewise updated to reduce the number of necessary checks.

- the nested loop can actually start from the square of `i`, instead of its double. This because two times `i` is already considered when `i` is itself equal to two

  ```js
  for (let j = i ** 2; j < n; j += i) {
    numbers[j - 2].isPrime = false;
  }
  ```

- since the nested loop marks the composite numbers from the square of `i`, we can finally end the outer loop at the square root of `n`

  ```js
  for (let i = 2; i < Math.sqrt(n); i += 1) {}
  ```

  It becomes frivolous to go through the nested loop when the starting point is already past the ending condition `j < n`.

## Wrap Up

In the excitement surrounding this efficient approach I almost forgot that finding the prime numbers isn't enough to close the challenge. We need to finally return the sum of these values, which is achieved through the always more familiar `reduce` function. Function which is however applied on the prime numbers only; this last feat is achieved either by filtering out the non-prime values, or adding the current value to the accumulator only if the boolean is set to true.

```js
function primeSummation(n) {
  const numbers = Array(n - 2)
    .fill("")
    .map((val, index) => ({
      isPrime: true,
      number: index + 2
    }));

  for (let i = 2; i < Math.sqrt(n); i += 1) {
    if (numbers[i - 2].isPrime) {
      for (let j = i ** 2; j < n; j += i) {
        numbers[j - 2].isPrime = false;
      }
    }
  }
  return numbers.reduce((acc, { isPrime, number }) => (isPrime ? acc + number : acc), 0);
}
```

---

The problem had me practice with for loop and also recursion, but I had to research the algorithm behind the _Sieve of Eratosthenes_. It is a tad hard to explain, but going through the source code one step at a time has hopefully helped. If you have any questions, I'll try to answer them [@borntofrappe](https://twitter.com/borntofrappe).
