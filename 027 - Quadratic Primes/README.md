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

### a

### n

<!-- ## Wrap Up -->
