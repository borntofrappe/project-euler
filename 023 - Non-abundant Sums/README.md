# [Non-abundant Sums](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-23-non-abundant-sums)

## Problem

> A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.
>
> A number `n` is called deficient if the sum of its proper divisors is less than `n` and it is called abundant if this sum exceeds `n`.
>
> As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.
>
> Find the sum of all positive integers `<= n` which cannot be written as the sum of two abundant numbers.

## Setup

```js
function sumOfNonAbundantNumbers(n) {
  // Good luck!
  return n;
}

sumOfNonAbundantNumbers(28123);
```

## Notes

The description is complex enough to warrant a bit of exploration, so let's start looking at abundant/deficient/perfect numbers.

### checkAbundance

In order to establish the "abundance", if we can so label it, of a number, we need to retrieve the proper divisors for said number. Luckily for us, we developed a `properDivisors` function in problem #21 which is slightly more efficient than iterating from `1` up to the given number.

```js
function properDivisors(num) {
  const divisors = [];

  for (let i = 1; i <= Math.sqrt(num); i += 1) {
    if (num % i === 0) {
      divisors.push(i);

      const j = num / i;
      if (j !== i && j !== num) {
        divisors.push(j);
      }
    }
  }

  return divisors.sort((a, b) => a - b);
}
```

I won't repeat myself here, but the idea is to find proper divisors in pairs: as soon as you find one, you can divide the input number by the divisor and find a new one.

With this function, we can check whether a number is abundant, or for that matter whether it is deficient or perfect, summing up the proper divisors.

```js
function checkAbundance(n) {
  const divisors = properDivisors(n);
  const sum = divisors.reduce((acc, curr) => acc + curr, 0);
}
```

Following the given instructions:

|           | Label     |
| --------- | --------- |
| sum === n | perfect   |
| sum < n   | deficient |
| sum > n   | abundant  |

We can determine the label for the number with a series of if/else if statements.

```js
function checkAbundance(n) {
  const divisors = properDivisors(n);
  const sum = divisors.reduce((acc, curr) => acc + curr, 0);
  if (sum === n) {
    return "Perfect";
  } else if (sum < n) {
    return "Deficient";
  }
  return "Abundant";
}
```

Ultimately, we'll only care if the number is abundant or not, but to attest a series of values, I decided to label each and every case.

```js
checkAbundance(6); // perfect, 1 + 2 + 3 === 6
checkAbundance(8); // deficient 1 + 2 + 4 < 8
checkAbundance(12); // abundant 1 + 2 + 3 + 4 + 6 > 12
```

In the `checkAbundance.js` script you find the code, with a for loop log the abundance of the first twenty numbers in the console.
