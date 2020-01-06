# [Largest Palindrome Product](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-4-largest-palindrome-product)

## Problem

> A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
>
> Find the largest palindrome made from the product of two `n`-digit numbers.

## Setup

```js
function largestPalindromeProduct(n) {
  // Good luck!
  return true;
}

largestPalindromeProduct(3);
```

## Notes

Seeing how the solution for 2-digit numbers boils down to `91 x 99`, I am almost tempted to set up a loop that starts from the highest possible numbers, for instance `99` and `99`, and then counts downwards until it finds a multiplication which satisfy the desired condition.

Let's see how that would work.

### Largest Number

Starting with a first hurdle, it is necessary to create the greatest integer with the input `n` digits.

Luckily for us, we can initialize an array and specify its length through the `Array()` construct itself. Unluckily for us, once we join this array, the end result is a string. This is however a minor annoyance rapidly fixed with a call to the `parseInt()` function.

```js
function largestNumber(n) {
  const largestNumberString = Array(n)
    .fill(9)
    .join("");

  return parseInt(largestNumberString, 10);
}
```

I could have wrapped the string itself in the `parseInt` function, but to illustrate the logic a little clearer I decided to split the two operations.

This logic allows to create the starting value for any input `n`. For instance:

```js
console.log(largestNumber(5)); // 99999
```

### Palindrome Checker

With the largest number, the idea is to multiply this value by itself, and then decrement the multiplier until a palindrome is found. I am slightly afraid of this portion, as I fear the repercussions of setting up a `for` loop with too many iterations, so I'll develop the logic describing a palindrome first.

It is first necessary to convert the integer back to a string.

```js
function palindromeChecker(n) {
  const candidate = n.toString();
}
```

Following this coercion, we can split the string in two halves, and then compare the values in order.

```js
function palindromeChecker(n) {
  const candidate = n.toString();
  const { length } = candidate;

  const firstHalf = candidate.slice(0, Math.floor(length / 2));
  const secondHalf = candidate.slice(Math.ceil(length / 2));
}
```

Bear in mind that in a situation where the string has an odd number of characters, it is enough to compare the values before and after the value in the middle. In simpler terms: `92x29` is a palindrome regardless of the central value.

`Math.floor` and then `Math.ceil` allow to consider the necessary halves.

For the comparison, we actually need to work on `secondHalf` a little more. We can actually pick `firstHalf`, as the logic is sound for both variables.

The idea is to take one of the two and reverse the order of the existing characters. Once reversed, it is then possible to check for equality between the two values.

```js
const secondHalf = candidate
  .slice(Math.ceil(length / 2))
  .split("")
  .reverse()
  .join("");
```

Creating an array is necessary because, at least in JavaScript, String is a primitive type which is _immutable_. Luckily for us, arrays are not.

Once arrayed, reversed, restrung, `secondHalf` describes a string which is the mirrored version of the selected half. This makes checking for a palindrome exceedingly easier.

```js
function palindromeChecker(n) {
  const candidate = n.toString();
  const { length } = candidate;
  const firstHalf = candidate.slice(0, Math.floor(length / 2));

  const secondHalf = candidate
    .slice(Math.ceil(length / 2))
    .split("")
    .reverse()
    .join("");

  return firstHalf === secondHalf;
}
```

With a couple of arbitrary values:

```js
console.log(palindromeChecker(9001)); // false
console.log(palindromeChecker(9009)); // true
```

### For Loop

We can now create the largest number out of `n` digits, and check whether an input number is a palindrome.

All is left is considering a series of multiplications through a `for` loop. With the last three problems I've become weary of this portion, as I fear I might set up a thoroughly inefficient solution, or even worse an infinite loop, but here it goes:

```js
// assuming largestNumber
for (i = largestNumber; i > 0; i -= 1) {
  // terminate the function as soon as a palindrome is found
  const product = largestNumber * i;
  if (palindromeChecker(product)) {
    return product;
  }
}
```

### Failure

I wished I had realized this sooner, but `99 * 5` is surely smaller than `98 * 98`. This is obvious, but not in the `for` loop, where I consider the product betwen the largest number and an ever decreasing multiplier. Before checking `98*98`, in other words, the loop considers `99*5` (and every other 2-digit beyond `5` for that matter).

Let's try a different approach.

<!-- ### Rewrite -->
