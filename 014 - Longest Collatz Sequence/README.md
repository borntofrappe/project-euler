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

## Notice

The problem has been solved with two solutions, but I am positive that both can be improved. The notes are also quite all over the place, but allowed me to practice aplenty with for loops, arrays and objects.

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

I've mixed feelings about this, especially since I had a plan for what I thought would be a failure. Let's continue with the mentioned improvement nonetheless.

### Arrays

The idea is to find a sequence which begins with the same value. If such a sequence exist, we preemptively exit the while loop attaching merging the two together. If it doesn't, we continue as described in the earlier snippets.

```js
while (n > 1) {
  const index = sequences.findIndex(([value]) => value === n);
  if (index !== -1) {
    sequences[index] = [...sequence, ...sequences[index].slice(1)];
    break;
  }
}
```

`slice(1)` to avoid keeping two copies of the matching value.

The `break` statement allows to exit the while loop, but unfortunately, the statement appending the current `sequence` array is _after_ the loop itself. To avoid duplicating the array, we can wrap the statement in an `if` statement, to append the sequence only if we reach the final value of `1`.

```js
if (n === 1) {
  sequences.push(sequence);
}
```

Second surprise of the day, the code fails.

By logging the `sequences` array, we can see that the data structure does describe a smaller set of values.

For instance and for `16`, there are `6` arrays, starting with `1`, `12`, `9`, `14`, `13` and `15`. Any other starting point is considered within these construct.

Despite this improvement in the size of the array however, it seems the code comes with a worse performance. I can only attribute this failure to the `findIndex` function, performing an excessive number of checks on every first value of the saved arrays.

### Object

While the approach of the previous section does not work, I decided to keep the code in the aptly named `failure.js` file. The logic is however, or perhaps should be, sound.

In this section, I tried to move from arrays to objects, to try and make due without the `findIndex` function. The syntax requires a few adjustments, so let's walk through it one step at a time.

We set up `sequences` as an object instead of an array.

```js
const sequences = {};
```

In the while loop, we keep an array to consider the current sequence.

Following the loop however, we add the array within the object, using the value generating the sequence as a key.

```js
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
  if (n === 1) {
    sequences[i] = sequence;
  }
}
```

As regards the improvement, we no longer need to find the array with a desired value, but can immediately check of the object has a field with a matching key.

```js
if (sequences[n]) {
  // match!
}
```

If such a value exist, we can actually delete the property. Before deleting the key-value pair however, we take the existing sequence and include it in the object under the new key.

```js
if (sequences[n]) {
  sequences[i] = [...sequence, ...sequences[n].slice(1)];
  delete sequences[n];
  break;
}
```

Following the `for` loop, we know have an object of a considerable size. Its keys refer to the numbers at the beginning of the sequence, while its values describe the sequences themselves.

Something similar to

```js
{
  12: [12, 6, 3, 10, 5, 16, 8, 4, 2, 1]
}
```

We can finally find the number with the longest sequence with a couple extra steps:

- build a 2D array describing the key-value pairs one at a time

  ```js
  const entries = Object.entries(sequences);
  ```

- sort by the length of the second item, which describes the sequence

  ```js
  const entries = Object.entries(sequences).sort((a, b) => (a[1].length < b[1].length ? 1 : -1));
  ```

- return the first key within the sorted array.

  ```js
  return entries[0][0];
  ```

It is a bit convoluted, especially because we end up with a string. Through the `parseInt` function however, we can complete the function outputting the desired value.

```js
return parseInt(entries[0][0]);
```

The code passes the test, and it does so with a smaller data structure.

---

I got to explore quite a few solutions in this problem:

- the surprising passing code stored in `success.js`

- the surprising failure described in `failure.js`

- the object oriented approach I decided to finally keep in `script.js`.

I didn't even bother considering the opposite route, where we start by `1` and build the sequence up to the greatest value up to `limit`. If you tried this approach, if you know why the code in `failure.js` is not performing, or just want to comment something, let me know [@borntofrappe](https://twitter.com/borntofrappe).
