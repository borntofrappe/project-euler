# [Multiples of 3 and 5](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-1-multiples-of-3-and-5)

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

- find the multiples of 3 and 5, up to the input number

- sum the given set of numbers

### Multiples of ...

With a first, reckless approach, I might be tempted to use the modulo operator `%`, looping from 0 up to the input number and considering every number for which the following expression returns true:

```js
if (num % 3 === 0 || num % 5 === 0) {
  // add to array
}
```

Elaborating the example a little further:

```js
function multiplesOf3and5(number) {
  // array of multiples
  const multiples = [];
  // loop from 0 up to the input number
  for (let i = 0; i < number; i += 1) {
    // add to the array multiples of 3 or 5
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
  // add every multiple of 3 up to the input number
  for (let i = 3; i < number; i += 3) {
    multiples.push(i);
  }
  return multiples;
}
```

Of course this covers only `3`, but we can add a second loop to consider the multiples of `5`. In this loop however, we must be careful not to duplicate values. After all, we consider numbers that are multiples of 3 **or** 5.

```js
function multiplesOf3and5(number) {
  const multiples = [];
  // add every multiple of 3 up to the input number
  for (let i = 3; i < number; i += 3) {
    multiples.push(i);
  }
  // add every multiple of 5 up to the input number
  // ! as long as the multiple is not already in the array
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

With a couple of differences:

- the array doesn't include `0`

- values which are multiples of `5`, but not of `3` are appended at the very end of the array. This is however a mild annoyance that has no influence on the final result. In a situation were the goal is to sum every value, what matters are the values themselves, not their order.

The array is however and fundamentally the same from the one retrieved with the first `for` loop. Had we started the loop at `1`, the two would even provide the same set of values.

That being said, the new solution looks more efficient. Consider how many values are not considered, because, and again by definition, they cannot satisfy the starting condition: `(1, 2, 4, 7, 8, ....)`.

It does suffer from an annoying trait though: in the second loop, we need to consider whether or not a value is already in the `multiples` array.

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

The code also looks quite repetitive. There are two loops with a very similar functionality. It'd be neat to have a loop which "jumps": from `3` to `5`, to `6`, to `9` and so forth. Considering only values we know to satisfy both conditions.

Perhaps a bit of planning and research would have helped, but let's consider the _difference_ between the values before looking at the wiki page for multiples.

Alas, this means we do care about the order.

```js
// array of multiples up to 100 (to have a larger sample)
const multiples = multiplesOf3and5(100);

// spread the values in a new array to avoid mutating the original one
const sortedMultiples = [...multiples]
  // sort by ascending order
  .sort((a, b) => (a > b ? 1 : -1));
```

From this sorted array, we can compute the difference between the current and previous item in the array.

```js
// compute the difference between each number and the previous value
// ! use `0` for the first item in the array
const difference = sortedMultiples.map((num, index, nums) => (index === 0 ? num : num - nums[index - 1]));
```

In this roundabout way, a pattern emerges.

```js
console.log(difference); // [ 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3, 1, 2, 3, 3, 2, 1, 3]
```

`3, 2, 1, 3, 1, 2, 3`. I'm sure there's significance and a mathematical formula to retrieve this pattern, but I'll take it as a given.

Using these values, we can virtually consider every multiple of 3 **or** 5 only once. The problem then becomes _how_ these values are added to the counter variable.

```js
function multiplesOf3and5(number) {
  // given pattern
  const pattern = [3, 2, 1, 3, 1, 2, 3];
  // starting point
  let counter = 3;
  // index of the value in the pattern array
  let index = 1;

  // array of multiples
  const multiples = [];

  // as long as counter is less than the input number
  while (counter < number) {
    // add the counter to the array
    multiples.push(counter);
    // increment the counter with the value given pattern
    counter += pattern[index];
    // refer to the next value
    index = (index + 1) % pattern.length;
  }
  return multiples;
}
```

It looks convoluted, but mostly due to the comeback of the modulo operator. The main issue incrementing the `index` variable is referring to a value outside of the array. By using the modulo operator, we make sure that index is "set back" once the variable exceeds the array's length.

Once it reaches the last item in the array, at index `5`, the variable is assigned a value of `0`:

```code
index = 5
index = (5 + 1) % 6 = 0
```

I use a `while` loop here, but this is out of familiarity more than anything. Which begs the question: is it possible to replicate the same functionality with a `for` loop? More specifically: is it possible to update the expression of the `for` loop _in_ the `for` loop?

Something like the following:

```js
// increment by x
for (let i = 0; i < 10; i += x) {
  // modify x
}
```

Turns out, it is possible. With a trivial example:

```js
let x = 1;
for (let i = 0; i < 10; i += x) {
  x += 1;
  console.log(i); // 0 2 5 9
}
```

`i` describes `0`, `2`, `5`, `9`. As in `0`, `0+2`, `2+3`, `5+4`.

It looks a tad weird, but it does work. You need to be careful as to how the expression changes, as this seems like an excellent way to involuntarily cause an infinite loop, but that is true for every `for` loop in general.

Since it works, it also means the previous `while` loop can be re-written as follows:

```js
for (let i = 3; i < number; i += pattern[index]) {
  multiples.push(i);
  index = (index + 1) % pattern.length;
}
```

Again, a tad convoluted, but making due without the `counter` variable.

```js
function multiplesOf3and5(number) {
  const pattern = [3, 2, 1, 3, 1, 2, 3];
  let index = 0;

  const multiples = [];

  for (let i = 3; i < number; i += pattern[index]) {
    multiples.push(i);
    index = (index + 1) % pattern.length;
  }

  return multiples;
}
```

### Sum

In the exploration of the different loops, I almost forgot that finding the multiples is not enough to solve the problem at hand. With a `reduce` function however, adding up every multiple is a slightly less challenging problem.

```js
return multiples.reduce((acc, curr) => acc + curr, 0);
```

Better developers have explained how the `reduce` function works, but let me try and explain it in my own words.

`acc` refers to the single output of the `reduce` function. It is initialized to `0`, which is the second argument of the function, and it is updated as instructed by the function passed as the first argument.

In this particular instance, it is incremented by `curr`. This value refers to each and every item in the input array. So that:

```js
[1, 7, 5].reduce((acc, curr) => acc + curr, 0);
```

Means that `curr` refers to `1`, then `7`, then `5`.

And means that `acc` starts at `0`, to then refer to `1` (`0+1`), `8` (`1+7`) and then `13` (`8+5`).

To fully understand the function, I'd highly recommend you invest the time in [this article on CSS Tricks](https://css-tricks.com/understanding-the-almighty-reducer/) from [Sarah Drasner](https://twitter.com/sarah_edo). If I can complete this part in one line of code is due to her thorough and clear explanation.

### Wrap Up

Bringing it all together, and with the still unfamiliar syntax using the last `for` loop, the problem is thusly solved.

```js
function multiplesOf3and5(number) {
  const pattern = [3, 2, 1, 3, 1, 2, 3];
  let index = 0;

  const multiples = [];

  for (let i = 3; i < number; i += pattern[index]) {
    multiples.push(i);
    index = (index + 1) % pattern.length;
  }

  return multiples.reduce((acc, curr) => acc + curr, 0);
}
```

---

What about _recursion_? I'm still trying to wrap my head around a function calling itself, so excuse this blatant omission.

I am positive there are a multitude of ways this solution could be improved, and you can tell me about it [@borntofrappe](https://twitter.com/borntofrappe).
