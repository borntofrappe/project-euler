# [Number Letter Counts](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-17-number-letter-counts)

## Problem

> If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
>
> If all the numbers from 1 to given `limit` inclusive were written out in words, how many letters would be used?
>
> **NOTE**: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.

## Setup

```js
function numberLetterCounts(limit) {
  // Good luck!
  return true;
}

numberLetterCounts(5);
```

## Notes

It seems inevitable that the problem requires a bit of tedious work, to set up a data structure describing the word of at least the first twenty or so numbers. I decided to use an object in which the key refers to the actual value of the matching number.

### 1 to 20

```js
const dictionary = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty"
};
```

With this setup, we can already produce the length of the characters behind the numbers from `1` up to `20`, inclusive.

```js
function numberLetterCounts(limit) {
  let counter = 0;
  for (let i = 1; i <= limit; i += 1) {
    counter += dictionary[i].length;
  }
  return counter;
}
```

We increment a counter variable with the length of the actual text. This works as one would hope, as long as `limit` is below or equal to 20.

```js
numberLetterCounts(5); // 19
numberLetterCounts(20); // 112
```

Past the upper threshold however, we understandably get an error message.

```js
numberLetterCounts(21); // TypeError: Cannot read property 'length' of undefined
```

`dictionary[21]` returns `undefined`, and since `undefined` has no `length` property, the code errors out with a _TypeError_.

The challenge now becomes how to fabricate the necessary words, using as much as possible from the `dictionary` object. You could specify the word for each number up to a desired threshold, but the goal of the project is to use code to minimize the size of the data structure. There are exceptions in the English language, but we can use its rules to considerably cut down on the necessary words.

### Recursion

Before we try to tackle numbers exceeding `20`, let me consider an alternative to the for loop in a function with a recursive call. I might switch to the first version, but since we care just about the length of the word and do not bother with the words themselves, recursion should be easy enough to understand.

```js
function numberLetterCounts(limit) {
  if (limit <= 0) {
    return 0;
  }
  const word = dictionary[limit];
  return word.length + numberLetterCounts(limit - 1);
}
```

In the base case we return `0`. In the recursive call we find the matching word and increment the previous value by the length of said word. Almost painless.

### Beyond 20

With the recursive call handling the current word and length, let's consider input values greater than `20`. Looking at the testing suite, it seems the largest value is `1000`, so we should handle anything from unit values up to the thousands. It should be possible to go beyond that, considering millions perhaps, but let's take it one step at a time.

Up to `100`, I made the choice to expand the dictionary object to consider the tens values: thirty, forty and so forth. It should be possible to build these values based on the unit value and the appendix `-ty`, but it saves me the headache to consider why four becomes forty, three becomes thirty and other minor annoyances.

If the number exceeds twenty, we break out the two digits to consider the tens and unit values. We find the words for the two parts of the words, and consider their length as a whole.

```js
let word = "";
if (limit > 20) {
  const tens = parseInt(`${limit}`[0], 10);
  const unit = parseInt(`${limit}`[1], 10);
  word = dictionary[tens * 10] + dictionary[unit];
} else {
  word = dictionary[limit];
}
```

I decided to initialize a variable before the `if` statement, as I have a feeling this will come in handy when handling higher and higher values.

With this setup, we can now complete the problem from `1` up to `99`, inclusive. Good, but not enough.

Notice that we are actually counting the characters of words like `fortytwo` and not technically `forty-two`, but the challenge instructs us not to bother with spaces and hyphens.

<!-- ### Beyond 99

### Beyond 999 -->
