# [Lexicographic Permutations](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-24-lexicographic-permutations)

## Problem

> A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:
>
>     012   021   102   120   201   210
>
> What is the nth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

## Setup

```js
function lexicographicPermutations(n) {
  // Good luck!
  return n;
}

lexicographicPermutations(999999);
```

## Notes

For two digits, there are two possible ways we can organize the digits.

```code
01
10
```

For three, the ways become `6`

```code
012
021
102
120
201
210
```

This relationship is described by the factorial: `3! = 3 * 2 * 1 = 6`.

For ten digits, we'd end up with `10!`...

With a handy `factorial` function:

```js
const factorial = n => {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
};
```

We can attest that such expression would produce `3628800`.

```js
factorial(10); // 3628800
```

Let me try and explain my approach now. We know that there are three plus millions ways to arrange the numbers. However, if we were to fix the first digit, for instance with `0`, that number would come down to:

```js
factorial(9); // 362880
```

Quite obvious since we just needed to remove a `0`, but I didn't realize that sooner. If we know this, we come to realize that there are `362880` possibilities before we exhaust every string beginning with the number `0`. In other words, `1023456789` is the `362881`-th digit in the series.

If that makes sense, there are again `362880` possibilities to sort strings beginning with `1`, leading us to consider that `2013456789` ought to be the `362880 * 2 + 1 = 725761` value.

Looking at the tests describe on the [freeCodeCamp platform](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-24-lexicographic-permutations), it almost looks like a sound logic. The `699999`-th number begins with `1`; the `899999`-th with a `2`.

The biggest challenge becomes how to extend this thinking to successive digits. Not to mention the final hurdle of translating this "approach" into code.

Let's consider `699999` and try to think in increments:

- compute the factorial of `9`: `362880`

- compute the integer division between the given number and the factorial: `Math.floor(699999 / 362880) = 1`

- compute the difference: `699999 - 362880 = 337119`

Given this, we already know that the string begins with `1`. What's more, we come to look for the `337119`-nth number out of the remaining characters.

Repeating the same logic for one less digit:

- compute the factorial of `8`: `40320`

- integer division: `Math.floor(337119 / 40320) = 8`. I would say gripes, but consider how `8` actually describes the eight number. We used `1`, and therefore the eighth value is actually `9`.

This might actually work. Let me describe the steps in a table just to be safe.

| index  | Factorial | Integer Division | Sequence   | Remaining | Difference            |
| ------ | --------- | ---------------- | ---------- | --------- | --------------------- |
| 699999 | 362880    | 1                | 1          | 023456789 | `699999 - 362880 * 1` |
| 337119 | 40320     | 8                | 19         | 02345678  | `337119 - 40320 * 8`  |
| 14559  | 5040      | 2                | 193        | 0245678   | `14559 - 5040 * 2`    |
| 4479   | 720       | 6                | 1938       | 024567    | `4479 - 720 * 6`      |
| 159    | 120       | 1                | 19382      | 04567     | `159 - 120 * 1`       |
| 39     | 24        | 1                | 193824     | 0567      | `39 - 24 * 1`         |
| 15     | 6         | 2                | 1938246    | 057       | `15 - 6 * 2`          |
| 3      | 2         | 1                | 19382465   | 07        | `3 - 2 * 1`           |
| 1      | 1         | 1                | 193824657  | 0         | `1 - 1 * 1`           |
| 0      | 1         | 0                | 1938246570 |           | `3 - 2 * 1`           |

Double checking the value, the sequence comes to match `1938246570`, and I'm almost giddy at the realization.

What's left, is the implementation in code of this incredibly efficient logic.
