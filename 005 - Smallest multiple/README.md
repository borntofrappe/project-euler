# [Smallest Multiple](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-5-smallest-multiple)

## ⚠️ Be Advised ⚠️

In this repo you find a few scripts:

- `failure.js` describes a rather reckless and inefficient approach, with the potential of causing infinite loops for larger values

- `attempt.js` builds on top of the existing logic to provide a solution which passes the testing suite without warning

- `script.js` describes my final take on the problem. It focuses more on math and should lead to the most solid approach among the three

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

- continue adding the product (`product * 2`, `product * 3`) until a solution is found

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

Thinking through the solution described in the rewrite section, I might have actually stumbled onto something.

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

Through these instances, I realized that prime numbers are at the heart and center of the problem. I'll walk you through the second example to explain the approach further:

```js
smallMult(7);
```

- loop from `7` down to `1`

- for each number, consider the prime numbers making up the value

  For instance: 7 (making up `7`), 3 and 2 (making up `6`), 5 (making up `5`)

- if you find a prime number which is already considered, "skip" it.

  "Skipping" might actually be a misleading term, so let me describe with `4`: here we have 2 and 2, but 2 is already considered, at least once, to make up `6`. In this situation we want to keep two instances of the number. This allows to fabricate six (`2 * 3`) and four at the same time (`4 * 4`).

  Following this same logic, 3 and 2 are not considered for `3` and `2` respectively, since they are already contemplated earlier.

Collected in this manner, it makes sense that the smallest multiple is just the multiplication of the prime numbers collected along the way. This leads back to the cryptic comment following each instance:

```js
smallMult(7);
  \-> 7 * 3 * 2 * 5 * 2 = 420
*/
```

Let's try to recreate this approach in code.

### Prime Factors

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

I leaned on recursion here, and despite the repeated use it still feels alien. The idea is to find the first number for which `n` can be evenly divided. This is without a doubt a prime number, as the loop cannot reach a non-prime before finding a prime which is already a factor for said value. A rather elaborate way to say `primeFactors(12)` cannot reach `4` before finding `2`, a prime.

If such a prime is found, the function calls itself with the result of the division, merging the result and the newfound prime in an array. The base case for `n <= 1` returns an empty array, which leads to the final result being an array of the desired values.

Extending the logic to consider the input number, we can collect the prime numbers as follows;

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

primeFactorsUpTo(12); // [2, 2, 3, 11, 2, 5, 3, 3, 2, 2, 2, 7, 2, 3, 5, 2, 2, 3, 2]
```

The issue is to then find which prime number to actually "skip".

### Absolute Frequency

Notice how the prime numbers are neatly lined up, in ascending order for every different input number (`2, 2, 3` making up 12, `11` making up 11 and so forth). We can take advantage of this structure with a `reduce` function, which creates a multidimensional array detailing the prime number as the first item, and the number of time it appears, consecutively, as the second.

Let me describe with a smaller set of values.

```js
[2, 2, 3, 3, 2, 3].reduce((acc, curr) => {
  // use the length of the array to consider the last item
  const { length } = acc;
  // if the last item describes the same prime, increment its counter
  if (length > 0 && acc[length - 1][0] === curr) {
    acc[length - 1][1] += 1;
    // else add a new array describing the prime
  } else {
    acc.push([curr, 1]);
  }
  return acc;
}, []); // [[2, 2], [3, 2], [2, 1], [3, 1]]
```

The array describes how `2` appears twice, then `3` again twice, followed by `2` and `1`, once respectively. With this type of measurement, we can rapidly "keep" the correct number of prime numbers, as represented by the number describing the greatest frequency.

With another `reduce` function and the `findIndex` method we can achieve the desired operation as follows:

```js
[
  [2, 2],
  [3, 2],
  [2, 1],
  [3, 1]
].reduce((acc, curr) => {
  // index of the prime in the acc array
  const index = acc.findIndex(([prime]) => prime === curr[0]);
  if (index !== -1) {
    // update the frequency of the prime to keep the greater between the two
    acc[index][1] = Math.max(acc[index][1], curr[1]);
  } else {
    // add the prime number with
    acc.push([curr[0], curr[1]]);
  }
  return acc;
}, []); // [[2, 2], [3, 2]]
```

What is left is multiplying the collected prime numbers.

```js
[
  [2, 2],
  [3, 2]
].reduce((acc, curr) => acc * Math.pow(curr[0], curr[1]), 1); // 36
```

Notice that the absolute frequency is included as the exponent for each prime number. This is because `[3, 2]` effectively describes `9`.

### Wrap Up

Tying the different reduce functions together:

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

  // array of primes
  const primes = [];
  for (let i = n; i > 1; i -= 1) {
    primes.push(...primeFactors(i));
  }

  // multidimensional array describing the frequency of the consecutive primes
  const primesFrequency = primes.reduce((acc, curr) => {
    // use the length of the array to consider the last item
    const { length } = acc;
    // if the last item describes the same prime, increment its counter
    if (length > 0 && acc[length - 1][0] === curr) {
      acc[length - 1][1] += 1;
      // else add a new array describing the prime
    } else {
      acc.push([curr, 1]);
    }
    return acc;
  }, []);

  // multidimensional array describing the consecutive primes with greatest frequency
  const primesGreatestFrequency = primesFrequency.reduce((acc, curr) => {
    // index of the prime in the acc array
    const index = acc.findIndex(([prime]) => prime === curr[0]);
    if (index !== -1) {
      // update the frequency of the prime to keep the greater between the two
      acc[index][1] = Math.max(acc[index][1], curr[1]);
    } else {
      // add the prime number with
      acc.push([curr[0], curr[1]]);
    }
    return acc;
  }, []);

  return primesGreatestFrequency.reduce((acc, curr) => acc * Math.pow(curr[0], curr[1]), 1);
}
console.log(smallestMult(50)); // 3.099044504245997e+21
```

---

Especially considering the last update, I've become more and more confident in the code solving the problem at hand. That being said, I am positive the data structures created through the `reduce()` function can be improved. If you know how, let me know [@borntofrappe](https://twitter.com/borntofrappe).
