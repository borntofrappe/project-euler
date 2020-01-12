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

I was tempted to label the second information as irrelevant, but consider the following:

| n = 1000 | a   | b   | c   |
| -------- | --- | --- | --- |
|          | 1   | 2   | 997 |
|          | 1   | 3   | 996 |
|          | 1   | 4   | 995 |

When we increase the gap between `a` and `b`, `c` needs to offset the difference. In light of this, I could see how a for loop, or two, might actually provide a solution. It might be inefficient, but let's see how it'd work:

1. loop from `1` to `Math.floor(n / 3)`

   ```js
   for (let a = 1; a < Math.floor(n / 3); a += 1) {}
   ```

   Why `n/3`?

   Well, the relationship described by `a + b + c = n` must hold true. Since the three variables are in ascending order, `a` cannot be more than a third of the sum.

   Consider if you will, an extreme case where `a`, `b` and `c` are just `1` space apart. In this instance: `a + (a + 1) + (a + 2) = n`, which leads to `a = (n - 3) / 3`. With this simple equation, the ending condition can actually be updated.

   ```js
   for (let a = 1; a < (n - 3) / 3; a += 1) {}
   ```

1. loop from `a` to `2 * (n-3) / 3`.

   ```js
   for (let a = 1; a < (n - 3) / 3; a += 1) {
     for (let b = a; b < (2 * (n - 3)) / 3; b += 1) {}
   }
   ```

   The ending condition mirrors the one described by `a`.

1. within the nested loop, compute `c` and test the sum of the squares.

   We know have access to three variables: `a`, `b` and let us not forget `n`. The freeCodeCamp platform actually initializes a variable `sumOfabc` to this value. It might be a hint for the solution, but we'll take it as a given.

   Since `a + b + c = n`, we can compute `c` by difference:

   ```js
   for (let a = 1; a < (n - 3) / 3; a += 1) {
     for (let b = a; b < (2 * (n - 3)) / 3; b += 1) {
       const c = sumOfabc - a - b;
     }
   }
   ```

   And to test whether or not the three variables describe a special triple, we can finally use Pythagoras' theorem

   ```js
   for (let a = 1; a < (n - 3) / 3; a += 1) {
     for (let b = a; b < (2 * (n - 3)) / 3; b += 1) {
       const c = sumOfabc - a - b;
       if (c ** 2 === a ** 2 + b ** 2) {
         return a * b * c;
       }
     }
   }
   ```

   We return the product of the three variables to follow the problem's assignment.

## Wrap Up

I've added a `return` statement outside of the `for` loop to describe when the function is not able to find a triplet, but the essence of the solution is already within the `for` loop(s).

```js
function specialPythagoreanTriplet(n) {
  let sumOfabc = n;
  for (let a = 1; a < (n - 3) / 3; a += 1) {
    for (let b = a; b < (2 * (n - 3)) / 3; b += 1) {
      const c = sumOfabc - a - b;
      if (c ** 2 === a ** 2 + b ** 2) {
        return a * b * c;
      }
    }
  }
  return `Unable to find a special Pythagorean triplet for n equal to ${n}`;
}
```

The code passes the tests sets up in the freeCodeCamp editor, and I can happily close the problem noticing I didn't have to loop up anything math related. I am sure knowledge regarding how to solve equations of multiple variables could have helped tremendously, and if you know how, I'm a tweet away, [@borntofrappe](https://twitter.com/borntofrappe).
