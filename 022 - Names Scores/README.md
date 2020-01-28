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

Let's try to find a solution incrementally, breaking down the larger function in smaller units.

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

### scoreName

To score the individual names, we can loop through the input array with a handy `reduce` function, but let's first address how to score a single item.

```js
function scoreName(position, name) {}
```

Notice that I specified two parameters for the position and the name. The position will actually be dictated by the index in the array, but here is considered as a given.

Following the problem's guidelines, the score of the letters matches the difference between each letter and the letter `A`, capitalized.

```js
function scoreName(position, name) {
  const score = name.split("").reduce((acc, curr) => acc + curr.charCodeAt(0) - "A".charCodeAt(0) + 1, 0);
  return score;
}
```

Here we split the letters in an array, and a helpful `reduce` function incrementally builds the score. We add `1` to each current value since the letter 'A', capitalized, is considered to be the first, 'B' the second and so forth.

For an arbitrary value, for instance:

```js
scoreName(938, "COLIN"); // 53
```

Not the actual score of the name, but already the score of the letters making up the string "COLIN". For the real value, we need to consider the position as well.

```js
function scoreName(position, name) {
  const score = name.split("").reduce((acc, curr) => acc + curr.charCodeAt(0) - "A".charCodeAt(0) + 1, 0);
  return position * score;
}
```

Finally reaching the desired value.

```js
scoreName(938, "COLIN"); // 49714
```

### scoreNames

Once we understand how each name is split and weighed according to the individual letters, considering the score of an array of names should be a rapid step forward.

```js
function scoreNames(arr) {
  return arr.reduce((acc, curr, index) => {
    const position = index + 1;
    const score = curr.split("").reduce((acc, curr) => acc + curr.charCodeAt(0) - "A".charCodeAt(0) + 1, 0);
    return [...acc, score * position];
  }, []);
}
```

For each word, we consider the score exactly like in the previous section, and then add the value to an array. Instead of using an arbitrary `position` however, we use the very own index within the array. Index incremented by `1` to match the problem's requirements. "COLIN" being the `938`-th name apparently means that "COLIN" is actually the `937`-th item.

Coming back to the `reduce` function, this one returns the score of the individual words.

```js
scoreNames(["COLIN", "TIM"]); // [53, 84]
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

scoreNames(["COLIN", "TIM"]); // 137
```

### namesScores

Going back to the function given in the setup phase, we can tie everything together in `namesScores(arr)`. We can actually chain the operations described so far one after the other, sorting the array and then immediately reducing the data structure to the desired score.

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

It works with both `test1` and `test2`.

```js
namesScores(test1); // 791
namesScores(test2); // 1468
```

And surprisingly enough, it works with the larger `names` array as well.

```js
namesScores(names); // 871198282
```

---

I was genuinely surprised to see the problem cleared so rapidly, and with very little trial and effort. I didn't even get a chance to consider an alternative approach. If you have, let me know [@borntofrappe](https://twitter.com/borntofrappe). I'm sure I'll have plenty to learn from you.
