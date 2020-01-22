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

The challenge now becomes how to fabricate the necessary words, using as much as possible from the `dictionary` object. You could specify the word for each number up to a desired threshold, but the challenge is to minimize the size of the data structure. There are exceptions in the English language, but we can use its rules to considerably cut down on the necessary words.

### Recursion

Before we try to tackle numbers exceeding `20`, let me consider an alternative to the for loop in a function with a recursive call. I might switch to the first version at a later stage, but since we care just about the length of the words, recursion should be easy enough to understand.

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

With the recursive call handling the current word and its length, let's consider input values greater than `20`. Looking at the testing suite, it seems the largest value is `1000`, so we should handle anything from unit values up to the thousands. It should be possible to go beyond that, considering millions perhaps, but let's take it one step at a time.

Up to `100`, I made the choice to expand the dictionary object to consider multiples of `10`: thirty, forty and so forth. It should be possible to build these values based on the unit value and the appendix `-ty`, but this saves me the headache to consider why four becomes forty, three becomes thirty and other minor annoyances.

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

It's worth to mention:

- I decided to initialize the variable describing the word before the `if` statement. I have a feeling this will come in handy when handling higher and higher values.

- by concatenating the words without whitespace, we are essentially considering `fortytwo` and not `forty-two`. Since the challenge instructs us not to bother with spaces and hyphens, this is however a desirable solution.

With this setup, we can now complete the problem from `1` up to, and including, `99`. Not entirely though. Let's walk through the `if` statement with a value like `30`:

- `30` being greater than `20`, we begin by splitting the number and its two digits: `3` and `0`. You might already see where this is going

- `dictionary[3 * 10]` finds the string `"thirty"`

- `dictionary[0]` finds... nothing for that matter. And since it can't find a matching key, it returns `undefined`.

This means we end up with "thirtyundefined". To fix this, we can actually append the unit only if said unit describes a number greater than `0`.

```js
if (limit > 20) {
  const tens = parseInt(`${limit}`[0], 10);
  const unit = parseInt(`${limit}`[1], 10);
  word = dictionary[tens * 10];

  if (unit > 0) {
    word += dictionary[unit];
  }
} else {
  word = dictionary[limit];
}
```

Initializing the variable before the `if` statement is already helpful.

### Beyond 99

Coming up to the hundreds, we must consider how the third digit is handled in the English language:

- three hundred

- one hundred and fifty-three

The behavior of the tens and unit values is exactly like in the previous section. This means we can update the `word` variable to consider the hundreds place and let the existing `if else` statement handling the rest.

```js
let word = "";
// consider the hundreds place
if (limit > 99) {
}

// consider the tens and units
if (limit > 20) {
} else {
}
```

Since the second if statement is equipped to handle numbers between 1 and 99, we need to also update the input value, subtracting the necessary hundreds to consider the remaining two digits. For this, I decided to include another variable instead of using `limit` itself, but both approaches should work.

Filling out the if statement:

- consider the first digit;

- update `word` to consider the matching unit, followed by the string _hundred_

- update `number` to consider the remaining digits in the statement which follows.

In code:

```js
let word = "";
let number = limit;
if (number > 99) {
  const hundreds = parseInt(`${number}`[0], 10);
  word += dictionary[hundreds];
  word += "hundred";

  number -= hundreds * 100;
}
```

We are able to move from the hundreds to the tens and units place, but in the process forgot one important keyword. For numbers like `123`, the variable `word` displays _onehundredtwentythree_, without the necessary conjunction.

Since the string `"and"` should be considered only if there are digits past the hundreds place (for _one hundred and one_, but not for _one hundred_), once we update the number we can append the value if strictly needed.

```js
number -= hundreds * 100;
if (number > 0) {
  word += "and";
}
```

Completing the function from any value between `1` and `999`.

### Beyond 999

I'm starting to consider there might be a better approach to consider an additional digit, but we can essentially replicate the structure used for the hundreds place.

- if `number` exceeds `999` consider the thousands place

- append the necessary digit followed by the `"thousand"` keyword

- subtract the necessary value from the `number` variable.

```js
if (number > 999) {
  const thousands = parseInt(`${number}`[0], 10);
  word += dictionary[thousands];
  word += "thousand";

  number -= thousands * 1000;
}
```

## Wrap Up

There's quite a bit of repetition, but the practice I got with recursion and string concatenation made a few extra keystrokes quite worth the price. We are now able to count the number of the characters for every number from `1` up to a `limit` that reaches the thousands. And all this thanks to a line of code I managed to almost forget, past the if else statements.

```js
return word.length + numberLetterCounts(limit - 1);
```

---

If you know how to improve the solution, or about an alternative approach, I try to log online almost every day [@borntofrappe](https://twitter.com/borntofrappe). I'm sure you'll have plenty to work with.
