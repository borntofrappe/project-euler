# [Special Pythagorean triplet](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-9-special-pythagorean-triplet)

## Problem

> A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
>
> a^2 + b^2 = c^2
>
> For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.
>
> There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc such that a + b + c = `n`.

## Setup

```js
function specialPythagoreanTriplet(n) {
  let sumOfabc = n;
  // Good luck!
  return true;
}

specialPythagoreanTriplet(1000);
```

## Notes

I am afraid I will have to look up something on solving equations, as my math skills won't be enough, but let's take it one step at a time.

Here's what we know to be true:

1. pythagoras' theorem

   ```code
   a^2 + b^2 = c^2
   ```

1. three natural numbers in ascending order

   ```code
   a < b < c
   ```

1. the sum of the three numbers

   ```code
   a + b + c = n
   ```
