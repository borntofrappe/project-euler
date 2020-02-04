# [Distinct Powers](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-29-distinct-powers)

## Problem

> Consider all integer combinations of ab for `2 ≤ a ≤ 5` and `2 ≤ b ≤ 5`:
>
> 2^2=4, 2^3=8, 2^4=16, 2^5=32
>
> 3^2=9, 3^3=27, 3^4=81, 3^5=243
>
> 4^2=16, 4^3=64, 4^4=256, 4^5=1024
>
> 5^2=25, 5^3=125, 5^4=625, 5^5=3125
>
> If they are then placed in numerical order, with any repeats removed, we get the following sequence of 15 distinct terms:
>
> 4, 8, 9, 16, 25, 27, 32, 64, 81, 125, 243, 256, 625, 1024, 3125
>
> How many distinct terms are in the sequence generated by a^b for `2 ≤ a ≤ n` and `2 ≤ b ≤ n`?

## Setup

```js
function distinctPowers(n) {
  // Good luck!
  return n;
}

distinctPowers(30);
```

## Notice

At the time of writing, the problem described on the [freeCodeCamp platform](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-29-distinct-powers) incorrectly describes the various powers (showing `22` instead of `2^2` for instance). Looking at the [project euler website](https://projecteuler.net/problem=29), I updated the description to match.

## Notes

We can set up two for loops to compute the exponent and push the result to an array. Past the loop, we can then return the size of the array.

```js
function distinctPowers(n) {
  const powers = [];
  for (let a = 2; a <= n; a += 1) {
    for (let b = 2; b <= n; b += 1) {
      powers.push(a ** b);
    }
  }

  return powers.push();
}
```

However, since we care only about _distinct_, unique terms, we need to winnow out any duplicate value. We can do this in several ways, but here, I'll describe a couple:

1. append to the `powers` array only if the value is not already included

   ```js
   const power = a ** b;
   if (!powers.includes(power)) {
     powers.push(power);
   }
   ```

1. use a _set_. In [JavaScript](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set), such a construct allows to create a list of unique items. It can be initialized with an array, and handily enough, comes with its own property to describe the number of its items.

   ```js
   return new Set(powers).size;
   ```

Both are valid approach, and both provide a solution for the problem at hand.

---

Focusing more on JavaScript than the math involved in the powers, I didn't bother to consider a more efficient approach than just computing the desired value and adding the value to a predefined data structure. If you have, let me know [@borntofrappe](https://twitter.com/borntofrappe).