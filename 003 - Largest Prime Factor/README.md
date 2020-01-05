# [Largest prime factor](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-3-largest-prime-factor)

## ⚠️ Be Advised ⚠️

I eventually stumbled upon a solution, but in a rather roundabout fashion. This means that this entry is not only verbose, but even dangerous at times. Some of the code will cause an infinite loop, but I'll be sure to remark this mishap as needed.

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

### Factors

These are values `i` for which the following expression returns `true`:

```js
number % i === 0;
```

Using the _modulo_ operator, values for which the remainder of the division is equal to zero.

We could set up a loop starting at `1` and considering every positive integer up to the input value.

```js
function factors(number) {
  // build the array of factors starting at 1 up to, and including, the input number
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

Including the logic of the `factors` function in the given code, we can therefore and immediately terminate the function.

```js
function largestPrimeFactor(number) {
  // build the array of factors
  const factors = [];

  for (let i = 1; i <= number; i += 1) {
    if (number % i === 0) {
      factors.push(i);
    }
  }

  // return the given, and prime, number
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

Starting from the greatest value means the function can stop its execution as soon as a prime number is found.

```js
// ⚠️ do not run this function with large numbers ⚠️

function largestPrimeFactor(number) {
  // array of factors
  const factors = [];

  for (let i = 1; i <= number; i += 1) {
    if (number % i === 0) {
      factors.push(i);
    }
  }
  // particular instance in which the input number is prime
  if (factors.length === 2) {
    return number;
  } else {
    // loop from the end of the array
    for (let i = factors.length - 1; i >= 0; i -= 1) {
      // current factor
      const factor = factors[i];
      // factors for the current factor
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

### Failure

There are three `for` loops, two of which are actually nested. I am almost sorry to have the console run through these construct, but the code clears the challenge. The challenge is cleared, but surprisingly, the console highlights a potential infinite loop on line `4`.

With a quick glimpse, I actually noticed how a simple `if` statement might actually improve the function, but the situation doesn't change.

Starting with the small improvement: in a situation in which we find more than `2` factors, it is no longer necessary to continue the nested `for` loop.

```js
// ⚠️ do not run this function with large numbers ⚠️

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

This might improve the performance of the nested loops, but, and perhaps expectedly, doesn't solve the issue highlighted on line `4`. This line describes the `for` loop identifying the factors for the input number.

I actually tried to run `largestPrimeFactor(600851475143)` in Chrome's console, please don't do the same mistake, and indeed the logic breaks the page. Considering such a high value, the error message starts to make sense: we are looping from `1` up to `600851475143`, every time checking for a factor of `600851475143` (divided by `1`, by `2` and so forth, 600 billion times more).

This doesn't mean the code is worth nothing however, as even the improvement included through the `if` statement might lead me toward a different, valid approach.

### Rewrite

Breaking out of the nested `for` loop as soon as a prime number is found leads me to re-consider the order of operations.

By finding the prime numbers first, could this improve the situation?

Starting with a function describing the prime numbers up to, and including, the input value:

```js
function primes(number) {
  // array of prime numbers
  const primes = [];
  // loop from 2 up to the input number
  for (let i = 2; i <= number; i += 1) {
    // find the prime number that is also a factor for the current number
    const prime = primes.find(prime => i % prime === 0);
    // if there's no such prime, the current number is
    if (!prime) {
      primes.push(i);
    }
  }
  return primes;
}
```

We can then look for the greatest prime that is also a factor of the input number. In the `largestPrimeFactor` function:

```js
// ⚠️ do not run this function with large numbers ⚠️

function largestPrimeFactor(number) {
  // array of primes
  const primes = [];
  for (let i = 2; i <= number; i += 1) {
    const prime = primes.find(prime => i % prime === 0);
    if (!prime) {
      primes.push(i);
    }
  }
  // return the first prime number that is also a factor of the input number
  return primes.reverse().find(prime => number % prime === 0);
}
```

`reverse()` does mutate the array, but the goal is finding the greatest value, so that the order of `primes` is not relevant.

It passes the challenge, and looks rather cleaner, but it does not solve the "_Potential infinite loop_", again "_detected on line 4_".

It'd be neat to find prime numbers top-down, from the input number until `1`. In this instance the function could return th first prime number for which `number % prime === 0`.

This actually leads me to think that, instead of finding first a set (factor or prime) and then the other (prime or factor), I should try to merge the two, finding the first prime factor.

The issue I have with the challenge is that the loop considers too many instances that cannot be prime, nor factor. In more practical terms, the issue is then how to consider only these prime factors, which leads me back to [problem #2](https://github.com/borntofrappe/project-euler/tree/master/002%20-%20Even%20Fibonacci%20Numbers) and the dreaded recursion. Let me try and explain the approach born out of this epiphany:

- find the first prime factor. This is the smallest, but hang on for a moment

- divide the input number by this newfound value

- call the function recursively, and with the result of the division

By recursively finding the first prime number, we break out the input number in smaller and smaller values. If the number is prime, then the function will identify such a value as the solution to the problem.

```js
// ✔️ it actually works :) ✔️

function largestPrimeFactor(number) {
  // array of primes
  const primes = [];
  // catalog prime numbers
  for (let i = 2; i <= number; i += 1) {
    const prime = primes.find(prime => i % prime === 0);
    if (!prime) {
      // add the prime number to the array
      primes.push(i);
      // if the prime number is also a factor for the input number exit the loop
      if (number % i === 0 && number !== i) {
        // call the function with the result of the division
        return largestPrimeFactor(number / i);
      }
    }
  }
  // if the function hasn't already returned a value, in the for loop, it means number is itself prime
  // the largest prime
  return number;
}
```

### Wrap Up

It works, and I am almost emotional about it. Had I planned my approach better however, and I would have realized how the underlying logic is sound and rather straightforward. Prime numbers are the fundamental blocks, the ultimate factors for any number. By divvying up the input value into primes, we can progressively find greater and greater values, until the last, indivisible number describes the desired solution.

Let me run through the code with an arbitrary input or two, to reinforce the validity of this approach.

```js
largestPrimeFactor(12);
```

- the function starts out building the `primes` array.

- upon finding `2`, it adds this value to the array. This is because there's no value in the starting array for which `2 % value === 0`.

- since the input number is evenly divisible by `2` and it is different from the input number (more on this soon), the `for` loop ends

- `largestPrimeFactor()` is called once more, this time with an input of `6` (12 / 2)

- the logic of the function repeats itself:

  - build the `primes` array

  - add `2` as a prime number

  - identify `2` as a factor

  - exit the `for` loop

  - call the function with `3` (6 / 2)

- one last time, the function runs again:

  - build the `primes` array

  - add `2` as a prime number

  - `2` is not a factor, so that the function considers the following prime number

  - add `3` as a prime number

  - identify `3` as a factor, however, do not exit the loop. This is because the input number and the prime number share the same value. In this instance, and outside of the scope of the `for` loop, share the number.

Now that I've run through the basic example, I've noticed how the conditional describing a factor can be simplified to consider only the presence of a factor. The number itself can be avoided by terminating the `for` loop with one less iteration.

```js
// from 2 up to the input number (excluded)
for (let i = 2; i < number; i += 1) {
  const prime = primes.find(prime => i % prime === 0);
  if (!prime) {
    // prime
    primes.push(i);
    if (number % i === 0) {
      // factor
      return largestPrimeFactor(number / i);
    }
  }
}

// return the input number, last and largest prime factor
return number;
```

---

I'm quite proud of the final snippet, but If I am positive of something, is that there's a better solution for the challenge at hand. If you know about it let me know [@borntofrappe](https://twitter.com/borntofrappe).
