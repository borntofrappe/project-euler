# [Names Scores](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-22-names-scores)

## Problem

> Using `names`, an array containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.
>
> For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.
>
> What is the total of all the name scores in the file?

## Setup

```js
function namesScores(arr) {
  // Good luck!
  return arr;
}

// Only change code above this line
const test1 = ["THIS", "IS", "ONLY", "A", "TEST"];
const test2 = ["I", "REPEAT", "THIS", "IS", "ONLY", "A", "TEST"];

namesScores(test1);
```

## Notes

Starting with an inefficient approach, let's try to understand the problem at hand.

### sortAlphabetically

The `.sort()` method allows to sort the input array rather efficiently, by comparing the two successive strings with the comparison operator.

```js
function sortAlphabetically(arr) {
  return arr.sort((a, b) => (a > b ? 1 : -1));
}
```

Testing with a couple of arbitrary values:

```js
const test1 = ["THIS", "IS", "ONLY", "A", "TEST"];
const test2 = ["EFFICIENT", "EFFECTIVE", "ECSTATIC", "EXCELLENT"];
sortAlphabetically(test1); // ["A", "IS", "ONLY", "TEST", "THIS"]
sortAlphabetically(test2); // ["ECSTATIC", "EFFECTIVE", "EFFICIENT", "EXCELLENT"]
```

You could even refactor the code to an arrow function if you feel particularly inclined.

```js
const sortAlphabetically = arr => arr.sort((a, b) => (a > b ? 1 : -1));
```

### scoreNames

With the sorted array, we can loop through the array with a handy `reduce` function.

```js
function scoreNames(arr) {
  return arr.reduce((acc, curr, index) => {
    const order = index + 1;
    const score = curr.split("").reduce((acc, curr) => acc + curr.charCodeAt(0) - "A".charCodeAt(0) + 1, 0);
    return [...acc, score * order];
  }, []);
}
```

We split each word in an array describing its characters, and add their number relative to the letter `A`, capitalized.

I wasn't unsure whether to consider the first item as the `0`-th, but it seems we count the order starting from `1`. For the same reason, we add `1` when considering the code of each capital letter.

Here we return the score of the individual items:

```js
const test3 = ["COLIN", "TIM"];
scoreNames(test3); // [53, 84]
```

But we can already add the values together in the body of the `reduce` function.

```js
function scoreNames(arr) {
  return arr.reduce((acc, curr, index) => {
    const order = index + 1;
    const score = curr.split("").reduce((acc, curr) => acc + curr.charCodeAt(0) - "A".charCodeAt(0) + 1, 0);
    return acc + score * order;
  }, 0);
}

scoreNames(test3); // 137
```

### namesScores

Going back to the function given in the setup phase, we can tie everything together and prep for an inevitable error message.

```js
function namesScores(arr) {
  return arr
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce((acc, curr, index) => {
      const order = index + 1;
      const score = curr.split("").reduce((acc, curr) => acc + curr.charCodeAt(0) - "A".charCodeAt(0) + 1, 0);
      return acc + score * order;
    }, 0);
}
```

Surprise. It did not fail.
