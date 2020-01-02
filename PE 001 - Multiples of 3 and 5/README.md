# [PE 001 - Multiples of 3 and 5](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-1-multiples-of-3-and-5)

## Problem

> If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
>
> Find the sum of all the multiples of 3 or 5 below the provided parameter value number.

## Setup

```js
function multiplesOf3and5(number) {
  // Good luck!
  return true;
}

multiplesOf3and5(1000);
```

## Notes

I can see the project as composed of two parts:

- find the multiples of 3 and 5, up to the input number;

- sum the given set of numbers.

The second portion is covered by a `reduce` function, but it is first necessary to build an array with the desired values.

### Multiples of ...

With a first, reckless approach, I might be tempted to use the module operator `%`, looping from 0 up to the input number and considering every number for which the following expression returns true:

```js
if (num % 3 === 0 || num % 5 === 0) {
  // add to array
}
```

Elaborating the example a little further:

```js
function multiplesOf3and5(number) {
  const multiples = [];
  for (let i = 0; i < number; i += 1) {
    if (i % 3 === 0 || i % 5 === 0) {
      multiples.push(i);
    }
  }
  return multiples;
}
```

With an arbitrary example:

```js
console.log(multiplesOf3and5(50)); // [0,  3,  5,  6,  9, 10, 12, 15, 18, 20, 21, 24, 25, 27, 30, 33, 35, 36, 39, 40, 42, 45, 48]
```

There's already a bug, and looks awfully inefficient, but it works.

Starting with the bug: the array considers `0` as a multiple. The quick and easy fix would be to start the loop from `1`, but this leads to the mentioned inefficiency. `1` cannot be a multiple either, nor `2` for that matter. A better starting value would be `3`. We know this to be a multiple, by definition. Consider then `4` however. Again, a similar reasoning occurs; we know the value not to be a multiple. A more efficient approach would therefore rely on the very definition of multiple.

```js
function multiplesOf3and5(number) {
  const multiples = [];
  for (let i = 3; i < number; i += 3) {
    multiples.push(i);
  }
  return multiples;
}
```

Of course this covers only `3`, and we can add a second loop to consider the multiples of `5`. It is however essential not to duplicate values. After all, we consider numbers that are multiples of 3 **or** 5.

```js
function multiplesOf3and5(number) {
  const multiples = [];
  for (let i = 3; i < number; i += 3) {
    multiples.push(i);
  }
  for (let i = 5; i < number; i += 5) {
    if (!multiples.includes(i)) {
      multiples.push(i);
    }
  }
  return multiples;
}
```

This leads us to a familiar output.

```js
console.log(multiplesOf3and5(50)); // [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 5, 10, 20, 25, 35, 40];
```

There are a couple of differences:

- the array doesn't include `0`

- values which are multiples of `5`, but not of `3` are appended at the very end of the array. This is however a mild annoyance that has no influence on the final result. In a situation were the goal is to sum every value, what matters are the values themselves.

Differences aside, the array are fundamentally the same. Had we started the loop at `1`, the two would even provide the same set of values.

That being said, the new solution looks more efficient. Consider how many values are not considered, because, and again by definition, they cannot satisfy the starting condition: `(1, 2, 4, 7, 8, ....)`.

It does suffer from an annoying trait though: in the second loop we need to consider whether or not a value is already in the `multiples` array.

```js
if (!multiples.includes(i)) {
  multiples.push(i);
}
```

Values like `15`, `30` and so forth are therefore considered _twice_. This wasn't the case in the first loop, where the conditional would clear as soon as the input number was found to be a multiple of `3`.

```js
if (i % 3 === 0 || i % 5 === 0) {
  multiples.push(i);
}
```

The code also looks quite repetitive. There are two loops with a very similar functionality. It'd be neat to have a loop which "jumps", from `3` to `5`, to `6`, to `9` and so forth. from values we know to satisfy both conditions.

Perhaps a bit of planning and research would have helped, but let's consider the _difference_ between the values first.

Alas, this means we do care about the order. Considering the multiples with a greater input value:

```js
const multiples = multiplesOf3and5(100);
const sortedMultiples = [...multiples].sort((a, b) => (a > b ? 1 : -1));
```

From this sorted array, we can compute the difference between the current and previous item in the array.

```js
const difference = sortedMultiples.map((num, index, nums) => (index === 0 ? num : num - nums[index - 1]));
```

Hihglighting the differences, a pattern emerges.

```js
console.log(difference); // [ 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3]
```

`3, 2, 1, 3, 1, 2, 3`. I'm sure there's significance and a mathematical to formulate this pattern, but I'll take it as a given.

This introduces a new problem as to _how_ the numbers are added.

```js
function multiplesOf3and5(number) {
  const pattern = [3, 2, 1, 3, 1, 2, 3];
  let counter = 3;
  let index = 1;

  const multiples = [];
  while (counter < number) {
    multiples.push(counter);
    counter += pattern[index];
    index = (index + 1) % pattern.length;
  }
  return multiples;
}
```

It looks convoluted, and again, there's certainly a better way to achieve the same result, but the idea is to have a new variable, `index`, which allows to retrieve the incrementing number from `pattern` array. This value is incremented at every iteration.

```js
while() {
  index = index + 1;
}
```

And to avoid referring to a value outside of the array, it is set back through the modulo operator.

```js
while() {
  index = (index + 1) % pattern.length;
}
```

In this manner, the counter variable can be updated with the numbers described in the `pattern` array.

I use a `while` loop here, which begs the question: can I replicate the same functionality with a `for` loop. This is actually a question I never asked myself: can I update the expression of the for loop _in_ the for loop?

Something like the following:

```js
for (let i = 0; i < 10; i += x) {
  // modify x
}
```

Turns out you can.

```js
let x = 1;
for (let i = 0; i < 10; i += x) {
  x += 1;
  console.log(i); // 0 2 5 9
}
```

It looks a tad weird. I don't know how valid it might be. But it does.

```js
for (let i = counter; i < number; i += pattern[index]) {
  multiples.push(counter);
  counter += pattern[index];
  index = (index + 1) % pattern.length;
}
```

### Sum

In the exploration of the different loops, I almost forgot finding the multiples is not enough to solve the problem. With a `reduce` function however, adding up every multiple is a matter of one line of code.

```js
return multiples.reduce((acc, curr) => acc + curr, 0);
```
