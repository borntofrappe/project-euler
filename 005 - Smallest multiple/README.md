# [Smallest multiple](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-5-smallest-multiple)

## ⚠️ Be Advised ⚠️

In this repo you find a few scripts:

- `failure.js` describes a rather reckless and inefficient approach, which still seems to work for smaller `n` values

- `attempt.js` builds on top of the existing logic to provide a more efficient, and hopefully valid, solution

- `script.hs` describes my final take on the problem. It focuses more on Math and should lead to the most efficient approach among the three

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

## Update

Thinking through the solution described in the rewrite section, I might have actually stumbled on a third approach.

Consider the following:

```js
smallMult(5); // 60
// 60 as in 5*2*2*3

smallMult(7); // 420
// as in 7*3*2*5*2

smallMult(10); // 2520
// as in 5*2*3*3*2*2*7

smallMult(13); // 360360
// as in 13*2*2*3*11*5*3*2*7
```

Through these instances, I realized that prime numbers are at the heart and center of the problem. I'll walk you through the second example to explain the epiphany further:

```js
smallMult(7);
```

- loop from the input number down to `1`

- for each number, consider the prime numbers making up the value

  For instance:

  - 7: 7

  - 6: 3 and 2

  - 5: 5

  ...

- If you find a prime number which is already considered, skip it. A small precaution though: skip the _individual_ value.

  - 4: 2 and 2, consider only one of the two numbers. The copy is already considered in `3*2`

Essentially, we are storing prime numbers which are responsible for making up the different values. In light of this, it makes sense to "keep" only one copy of the prime number. We compute `4` as `2*2`, and one is already available. We need "only" two copies of the prime number.

Once they are collected, it makes sense that the smallest multiple is just the multiplication of the prime numbers collected along the way.

Which leads us back to the cryptic comment following each instance:

```js
smallMult(7);
/* as in
7: 7
6: 3 and 2
5: 5
4: 2 and 2
  ! one 2 is already considered
  "keep" 2
3: 3
  ! already considered
  skip
2: 2
  ! already considered
  skip

  \-> 7 * 3 * 2 * 5 * 2 = 420
*/
```

Let's try to follow this approach in code.

Starting from a value `n`, we need to consider the prime numbers making up the value.

```js
function primeFactors(n) {
  if (n <= 1) {
    return [];
  }
  for (let i = 2; i <= n; i += 1) {
    if (n % i === 0) {
      return [i, ...primeFactors(n / i)];
    }
  }
}

primeFactors(12); // [2 2 3]
```

I leaned on recursion here, and despite the repeated use it still feels alien. The idea is to find the first number for which `n` can be evenly divided. This is without a doubt a prime number, as the loop cannot reach a non-prime value before finding a prime which is already a factor for said value. A rather cryptic way to say `primeFactors(12)` cannot reach `4` before finding `2`, a prime,

If such a prime is found, the function calls itself with the result of the division, merging the result and the newfound prime in an array. The base case for `n <= 1` returns an empty array, which leads to the final result being an array of the desired values.

Extending this logic in the given function:

```js
function primeFactorsUpTo(n) {
  function primeFactors(x) {
    if (x <= 1) {
      return [];
    }
    for (let i = 2; i <= x; i += 1) {
      if (x % i === 0) {
        return [i, ...primeFactors(x / i)];
      }
    }
  }

  const primes = [];
  for (let i = n; i > 1; i -= 1) {
    primes.push(...primeFactors(i));
  }

  return primes;
}

primeFactorsUpTo(7); // [7, 2, 3, 5, 2, 2, 3, 2]
```

Here I collect the prime numbers making up the numbers from `n` down to `2`. The issue is then how to "keep" only the prime numbers which are strictly necessary.

To do this, the contents of the `for` loop and the very structure of the `primes` array need to be modified.

```js
const primes = [];
for (let i = n; i > 1; i -= 1) {
  primes.push(...primeFactors(i));
}
```

Instead of storing the numbers, as-is, the idea is to create a data structure describing the prime number _and_ the number of times said value appears. A counter effectively.

Considering a single iteration in the `for` loop, with an arbitrary value of `36`:

```js
function primeFactors(x) {
  if (x <= 1) {
    return [];
  }
  for (let i = 2; i <= x; i += 1) {
    if (x % i === 0) {
      return [i, ...primeFactors(x / i)];
    }
  }
}

const factors = primeFactors(36).reduce((acc, curr) => {
  if (acc[curr]) {
    acc[curr] += 1;
  } else {
    acc[curr] = 1;
  }
  return acc;
}, {});

console.log(factors); // {2: 2, 3: 2}
```

The `reduce` function creates an object, where the keys are the prime numbers, and the values describe the respective counters.

Applied to every iteration, the logic can be expanded to create several objects.

```js
const primes = [];
for (let i = n; i > 1; i -= 1) {
  const factors = primeFactors(i).reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});

  primes.push(factors);
}
```

The idea is to retain in the data structures, and for each key, the largest value.

```js
const mostFrequentPrimes = primes.reduce((acc, curr) => {
  const [prime, counter] = Object.entries(curr);
  if (acc[prime]) {
    const value = Math.max(acc[prime], counter);
    acc[prime] = value;
  } else {
    acc[prime] = counter;
  }
  return acc;
}, {});
```

And to finally return the result of the multiplication, considering both prime numbers and their number of occurrences.

```js
mostFrequentPrimes.reduce((acc, curr) => {
  const [prime, counter] = Object.entries(curr);
  return acc * prime * counter;
}, 1);
```

Leading us to the final solution:

```js
function smallestMult(n) {
  // function recursively providing the prime numbers making up the input x
  function primeFactors(x) {
    if (x <= 1) {
      return [];
    }
    for (let i = 2; i <= x; i += 1) {
      if (x % i === 0) {
        return [i, ...primeFactors(x / i)];
      }
    }
  }

  // array of objects describing the prime numbers and their absolute frequency
  const primes = [];
  for (let i = n; i > 1; i -= 1) {
    const factors = primeFactors(i).reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr] += 1;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

    primes.push(factors);
  }

  // object considering the prime numbers with greatest absolute frequency
  const mostFrequentPrimes = primes.reduce((acc, curr) => {
    const [prime, counter] = Object.entries(curr)[0];
    if (acc[prime]) {
      const value = Math.max(acc[prime], counter);
      acc[prime] = value;
    } else {
      acc[prime] = counter;
    }
    return acc;
  }, {});

  // smallest multiple
  return Object.entries(mostFrequentPrimes).reduce((acc, [prime, counter]) => {
    return acc * prime * counter;
  }, 1);
}

smallestMult(7); //
```

---

Especially considering the latest update, I've become more and more confident in the code solving the problem at hand. That being said, I am positive the data structure created through the `reduce()` funtion can be improved. If you know how, let me know [@borntofrappe](https://twitter.com/borntofrappe).
