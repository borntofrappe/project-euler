# [Longest Collatz Sequence](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-14-longest-collatz-sequence)

## Problem

> The following iterative sequence is defined for the set of positive integers:
>
> n → n/2 (n is even)
> n → 3n + 1 (n is odd)
>
> Using the rule above and starting with 13, we generate the following sequence:
>
> 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
>
> It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
>
> Which starting number, under the given `limit`, produces the longest chain?
>
> NOTE: Once the chain starts the terms are allowed to go above one million.

## Setup

```js
function longestCollatzSequence(limit) {
  // Good luck!
  return true;
}

longestCollatzSequence(14);
```

## Notes

Once the logic behind the two rules kicks in:

- if the number is even, divide by `2`

- if the number is odd, multiply by `3` and add `1`

The sequence is quite easy to understand.

Implemented for a given integer:

```js
function collatzSequence(n) {
  const sequence = [n];
  while (n > 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = n * 3 + 1;
    }

    sequence.push(n);
  }
  input;
  return sequence;
}
```

For instance:

```js
collatzSequence(6); // [6, 3, 10, 5, 16, 8, 4, 2, 1]
```

You could even replicate the structure using recursion.

```js
function collatzSequence(n) {
  if (n <= 1) {
    return [1];
  }
  const nextValue = n % 2 === 0 ? n / 2 : n * 3 + 1;
  return [n, ...collatzSequence(nextValue)];
}
```

In the base case we return an array with the final item, `1`, and in the recursive call we call the function with `nextValue` computed following the the odd/even guidelines.

The ternary operator could have actually been included in the function call directly, but it made for a rather messy line of code.

### For Loop

From this starting point, you could start a loop from `1` up to the input `limit`, but of course, this is the solution which is meant to be rejected by the testing suite for being extremely inefficient.

The example provided above however, leads me to a first improvement. Consider the following sequences:

```js
collatzSequence(10); // [10, 5, 16, 8, 4, 2, 1]
collatzSequence(23); // [23, 70, 35, 106, 53, 160, 80, 40, 20, 10, 5, 16, 8, 4, 2, 1]
```

And notice how once the second sequence reaches the previous value `10`, it follows the same path. In this instance we can preemptively terminate the recursive call, and use the available sequence instead.

Let's try to implement it in code, and within the scope of the given function.

Without the mentioned improvement, the sequences can be collected in an array as follows:

```js
function longestCollatzSequence(limit) {
  let sequences = [];
  for (let i = 1; i < limit; i += 1) {
    let n = i;
    const sequence = [n];
    while (n > 1) {
      if (n % 2 === 0) {
        n /= 2;
      } else {
        n = n * 3 + 1;
      }
      sequence.push(n);
    }
    sequences.push(sequence);
  }
  return sequences;
}
```

Trying with a value low enough not to crash our console:

```js
longestCollatzSequence(5);
```

Returns the following construct:

| index | Sequence                   |
| ----- | -------------------------- |
| 0     | [1]                        |
| 1     | [2, 1]                     |
| 2     | [3, 10, 5, 16, 8, 4, 2, 1] |
| 3     | [4, 2, 1]                  |

Note that since arrays are zero-base indexed, the sequences describe the number in the `[1, 4]` range.

Since we care about the number producing the longest sequence, we can return the first item of the longest array.

```js
return sequences.sort((a, b) => (a.length < b.length ? 1 : -1))[0][0];
```

And surprisingly enough, it passes the tests set up [on the freeCodeCamp platform](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-14-longest-collatz-sequence).

Apparently it takes a while, but not enough to have the test time out and fail.
