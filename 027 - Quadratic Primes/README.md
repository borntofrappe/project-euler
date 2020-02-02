# [Quadratic Primes](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-27-quadratic-primes)

## Problem

> Euler discovered the remarkable quadratic formula:
>
> `n^2+n+41`
>
> It turns out that the formula will produce 40 primes for the consecutive integer values `0≤n≤39` . However, when `n=40`,`40^2+40+41=40(40+1)+41` is divisible by 41, and certainly when `n=41`,`41^2+41+41` is clearly divisible by 41.
>
> The incredible formula `n^2−79n+1601` was discovered, which produces 80 primes for the consecutive values `0≤n≤79` . The product of the coefficients, −79 and 1601, is −126479.
>
> Considering quadratics of the form:
>
> `n^2+an+b` , where `|a| < range` and `|b| ≤ range` where `|n|` is the modulus/absolute value of n e.g. `|11|=11` and `|−4|=4`
>
> Find the product of the coefficients, `a` and `b` , for the quadratic expression that produces the maximum number of primes for consecutive values of `n`, starting with `n=0` .

## Setup

```js
function quadraticPrimes(range) {
  // Good luck!
  return range;
}

quadraticPrimes(1000);
```

## Notice

The description of the problem was less than clear, and [looking at the project Euler's own website](https://projecteuler.net/problem=27), I found quite an important difference in the text:

> where |a|<1000 and |b|≤1000

## Notes

Looking at the quadratic expression, we can immediately update the possible values for `b`. This is because in the moment we start evaluating the expression with `n = 0`, we are left with `b`.

```code
n^2 + a*n + b = prime
0 + 0 + b = prime
b = prime
```

Therefore, and since the expression must find a prime number, `b` must be prime itself. Not only that, it must also be positive. This is because a [prime number](https://en.wikipedia.org/wiki/Prime_number) is _a natural number **greater than 1** that cannot be formed by multiplying two smaller natural numbers_.

With this quick consideration, we can update `b` as a value in the `1 <= b <= 1000` range that is also prime.

Using the sieve of Erathosthenes, we can find the prime numbers below the four digits threshold as explained in problem #10.

- create an array of numbers up to the input `n`, using a boolean flag to describe whether the numbers are prime or not

```js
function primes(n) {
  const numbers = Array(n - 2)
    .fill("")
    .map((num, index) => ({
      isPrime: true,
      number: index + 2
    }));
```

By default, they are set to `true`, but looping through the array, we then proceed to mark as non-prime, in jargon _composite_, each number that is a multiple of a previous one.

```js
for (let i = 2; i < Math.sqrt(n); i += 1) {
  if (numbers[i - 2].isPrime) {
    for (let j = i ** 2; j < n; j += i) {
      numbers[j - 2].isPrime = false;
    }
  }
}
```

In this manner, we can stop at the square root of the input `n`, since a greater value would not be able to find a multiple in the array that has already been switched to false.

You can find the function in `primes.js`, with the only addition being a `filter()` and `map()` function to return an array describing only prime numbers.

```js
return numbers.filter(({ isPrime }) => isPrime).map(({ number }) => number);
```

That being said, I'll point you to [problem #10]() for a more thorough explanation. It is actually one of the most useful algorithms I've discovered so far in this challenge.

Coming back to the problem at hand, we can find the prime numbers below `1000` using the algorithm.

```js
const thousandPrimes = primes(1000);
```

We find an array of `168` items, which is hefty, but certainly an improvement from the `2000` possibilities of the previous range.

### Update

Re-considering the actual text of the challenge, and most importantly the function given in the setup, it seems `range` is actually given as the input of the function. I was misled to consider the input would be `n`, describing the number of consecutive prime numbers to actually find. This certainly clears things up, and most practically means we care about the prime numbers below the input value:

```js
function quadraticPrimes(range) {
  const primesRange = primes(range);
}
```

Apologies for the misinterpretation. Just understanding the problem took a bit of effort on my part.

### b

As mentioned, `b` is supposed to be a prime number below the input `range`. With this in mind, the function begins by finding an array of the necessary prime numbers. We can loop through said numbers to find the candidate which is able to generate the most consecutive numbers.

```js
function quadraticPrimes(range) {
  const primesRange = primes(range);
  for (let i = 0; i < primesRange.length; i += 1) {
    const b = primesRange[i];
  }
}
```

- prime below `range`

### a

Given the prime `b` value, `a` is an integer in the `[-range, range]` interval. If I were more knowledgeable about quadratic equations I might have been able to find a more efficient interval, but let's start with the given boundaries.

```js
function quadraticPrimes(range) {
  const primesRange = primes(range);
  for (let i = 0; i < primesRange.length; i += 1) {
    const b = primesRange[i];
    for (let a = range * -1 + 1; a < range; a += 1) {}
  }
}
```

### n^2 + na + b

In the nested for loop, we then consider the values for `a` and `b` in the quadratic expression `n^2 + na + b`. Starting with `n = 0`, we continue until we find a number that is not prime.

```js
function quadraticPrimes(range) {
  const primesRange = primes(range);
  for (let i = 0; i < primesRange.length; i += 1) {
    const b = primesRange[i];
    for (let a = range * -1 + 1; a < range; a += 1) {
      let n = 0;
      while(???) {
        n + = 1;
      }
    }
  }
}
```

To determine if `n ** 2 + a * n + b` provides a prime number, we can immediately check if the result of the equation is included in `primesRange`. This won't be enough, as the equation will inevitably exceed the values stored below the input `range`, but provides a solid basis from which to start.

```js
while (primesRange.includes(n ** 2 + a * n + b)) {
  // prime
}
```

Past the numbers expressed in the range, we need to attest if the result is still prime. To this end, I decided to create yet another function, in which the logic of the Sieve of Erathostenes is applied to return a boolean.

```js
function isPrimeNumber(n) {
  if (n < 2) {
    return false;
  }
  if (n % 2 === 0 || n % 3 === 0) {
    return n === 2 || n === 3;
  }
  for (let i = 5; i < Math.sqrt(n); i += 1) {
    if (n % i === 0) {
      return false;
    }
    for (let j = i ** 2; j < n; j += i) {
      if (n % j === 0) {
        return false;
      }
    }
  }
  return true;
}
```

This starts to be quite inefficient, but we can limit the use of the function when `n` exceeds the last value available in the `primesRange` array.

```js
while (primesRange.includes(n ** 2 + a * n + b) || (n > primesRange[primesRange.length - 1] && isPrimeNumber(n ** 2 + a * n + b))) {
  // prime
}
```

Quite a long expression, but one that does the trick. If the result is included in `primesRange`, it is prime. If it exceeds this array and the `isPrimeNumber` returns an affirmative boolean, the result is yet again prime, and the `while` loop continues.

### Solution

We are looping through the necessary values, but need a data structure in which to stored the values, most prominently `a` and `b`, as to ultimately provide the desired product. Going back to the `quadraticPrimes` and trying to tie everything together, we begin by describing the three variables in an object.

```js
function quadraticPrimes(range) {
  const primesRange = primes(range);

  const solution = {
    n: 0,
    a: 0,
    b: 0
  };
}
```

`n` is necessary to keep track of the consecutive prime numbers, and as a way to update `a` and `b` in the moment the two identify a longer streak.

With this setup, we then proceed to loop through the values as explained earlier.

```js
function quadraticPrimes(range) {
  const primesRange = primes(range);

  const solution = {
    n: 0,
    a: 0,
    b: 0
  };

  for (let i = 0; i < primesRange.length; i += 1) {
    const b = primesRange[i];
    for (let a = range * -1 + 1; a < range; a += 1) {
      let n = 0;
      while (primesRange.includes(n ** 2 + a * n + b) || (n ** 2 + a * n + b > primesRange[primesRange.length - 1] && isPrimeNumber(n ** 2 + a * n + b))) {
        n += 1;
      }
      if (n > solution.n) {
        solution.n = n;
        solution.a = a;
        solution.b = b;
      }
    }
  }
}
```

The `solution` object is updated according to the newfound series of consecutive prime numbers. That being said, we can actually improve the nested for loop by re-considering the accepted value for `a`.

### a/2

To restrict the accepted values of `b`, we considered the special instance in which `n = 0`. Considering the next iteration, and `n = 1`, we can further cut down on the number of checks looking at the variable `a`.

When `n = 1` we are left with `1 + a + b`

```code
1 + a + b = prime
```

Since this expression needs to be a prime, we can limit `a` by looking at `b + 1`. Except when `b` is equal to `2`, the variable is always odd. Otherwise, it would not be prime. In this instance `b + 1` is always even, and `a` must be odd. Otherwise, the expression would generate an even, non prime number.

If that sounds twisted, consider an arbitrary prime number for `b`:

```code
1 + a + 3
a + 4
```

`a + 4` must be prime, which means `a` cannot be even.

In most practical terms, this allows to reduce the number of checks with an additional `if` statement:

```js
for (let i = 0; i < primesRange.length; i += 1) {
  const b = primesRange[i];
  for (let a = range * -1 + 1; a < range; a += 1) {
    if (!(b === 2 && a % 2 !== 0)) {
      // check for prime numbers
    }
  }
}
```

Look for prime numbers as long as `a` can generate a prime number when `n = 1`.

### Wrap Up

In the confusion generated by while and for loops, I left out one key line of code to actually return the number expected by the problem.

```js
return solution.a * solution.b;
```

Providing a valid, although questionable in its efficiency, solution.

---

With this problem I was able to practice with comparisons operators and boolean expressions. I would like to find a more efficient solution, perhaps setting up a simpler condition in the nested loop, but I cannot fathom a way to create a set of prime numbers which account for every possibility past `range`. If you are more mathematically inclined, feel free to disperse your knowledge, I'm [@borntofrappe](https://twitter.com/borntofrappe).
