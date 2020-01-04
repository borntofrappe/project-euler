# [Largest prime factor](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-3-largest-prime-factor)

## Problem

> The prime factors of 13195 are 5, 7, 13 and 29.
>
> What is the largest prime factor of the given `number`?

## Setup

```js
function largestPrimeFactor(number) {
  // Good luck!
  return true;
}

largestPrimeFactor(13195);
```

## Notes

I am afraid my solution will prove to be thoroughly inefficient, but let's start with a `for` loop or two.

The problem can be split in two issues:

- find the factors for the given number

- among the factors, find the greatest prime number

The order in which the two issues are tackled might actually influence the function's runtime. Are there more factors or prime numbers? Surely, it depends on the input number.

### Factors

These are values `i` for which the following expression returns `true`:

```js
number % i === 0;
```

Using the _modulo_ operator, values for which the remainder of the division is equal to zero.

We could set up a loop starting at `1` and considering every positive integer up to the input value.

```js
function factors(number) {
  const factors = [];
  for (let i = 1; i <= number; i += 1) {
    if (number % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}
```

For an arbitrary couple of values for instance:

```js
factors(20); // [1, 2, 4, 5, 10, 20]
factors(7); // [1, 7]
```

Notice that with a prime number, `7`, there are only two factors, namely `1` and the input number. In this instance, the function can immediately return said input number without checking for which prime factor is the greatest.

Including the logic of the `factors` function in the given code, we can therefore and immediately terminate the function for the described instance in which `factors describes an array of two items.

```js
function largestPrimeFactor(number) {
  const factors = [];

  for (let i = 1; i <= number; i += 1) {
    if (number % i === 0) {
      factors.push(i);
    }
  }
  if (factors.length === 2) {
    return number;
  }
}
```

Past this case however, it is necessary to identify the prime numbers.

### Prime Numbers

In a situation in which there are more than two factors, a new `for` loop is necessary. Actually two loops:

- loop through the array of factors, in descending order;

- for each factor, loop from `1` up to the factor to describe if the number is a prime number.

Starting from the greatest value means the function can stop its execution as soon as a prime number is found, and there's no need to compare prime factors, but the nested loop does look inefficient.

```js
function largestPrimeFactor(number) {
  const factors = [];

  for (let i = 1; i <= number; i += 1) {
    if (number % i === 0) {
      factors.push(i);
    }
  }
  if (factors.length === 2) {
    return number;
  } else {
    // loop from the end of the array
    for (let i = factors.length - 1; i >= 0; i -= 1) {
      // current factor
      const factor = factors[i];
      // find the factors for the current factors
      const factorFactors = [];
      for (let j = 1; j <= factor; j += 1) {
        if (factor % j === 0) {
          factorFactors.push(j);
        }
      }
      // if there are only two factors for the current factor, return such a prime number
      if (factorFactors.length === 2) {
        return factor;
      }
    }
  }
}
```

## ~~Wrap Up?~~ Failure!

There are three `for` loops, two of which are actually nested. I am almost sorry to have the console run through these construct, but the code passes the challenge. It does so, but the console highlights a potential infinite loop on line `4`.

With a quick look-see, I actually noticed how a simple `if` statement might actually improve the function, but the situation doesn't change.

Starting with this small improvement: in a situation in which we find more than `2` factors, it is no longer necessary to continue the `for` loop. `3` is enough to describe how the number is indeed not prime.

```js
function largestPrimeFactor(number) {
  const factors = [];

  for (let i = 1; i <= number; i += 1) {
    if (number % i === 0) {
      factors.push(i);
    }
  }
  if (factors.length === 2) {
    return number;
  } else {
    for (let i = factors.length - 1; i >= 0; i -= 1) {
      const factor = factors[i];
      const factorFactors = [];
      for (let j = 1; j <= factor; j += 1) {
        if (factor % j === 0) {
          factorFactors.push(j);
        }
        // preemptively exit the for loop
        // the current factor cannot be prime
        if (factorFactors.length > 2) {
          break;
        }
      }
      if (factorFactors.length === 2) {
        return factor;
      }
    }
  }
}
```

This might improve the performance of the nested loops, but expectedly, doesn't solve the issue the test highlights with the first `for` loop.

I actually tried to run `largestPrimeFactor(600851475143)` in Google Chrome's console, please don't do the same mistake, and indeed the logic breaks the page. Considering such a high value it actually makes sense the infinite loop is identified on line `4`. We are looping from `1` up to `600851475143`, every time checking for a factor of `600851475143`.

It is evident starting from `1` up to the input number is quite an inconsiderate solution, but the improvement introduced within the nested `for` loop actually makes me re-think the entire approach.

More tomorrow.

<!-- If I am positive of something, is that there's a better solution for the challenge at hand. If you know about it let me know [@borntofrappe](https://twitter.com/borntofrappe). -->
