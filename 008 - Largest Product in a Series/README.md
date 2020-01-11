# [Largest Product in a Series](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-8-largest-product-in-a-series)

## Problem

> The four adjacent digits in the 1000-digit number that have the greatest product are 9 × 9 × 8 × 9 = 5832.
>
> Find the `n` adjacent digits in the 1000-digit number that have the greatest product. What is the value of this product?

## Setup

```js
function largestProductinaSeries(n) {
  // Good luck!
  let thousandDigits = [];
  return true;
}

largestProductinaSeries(13);
```

## Notes

Please note that the `thousandDigits` array is supposed to contain one thousand digits, as specified [in the problem on freeCodeCamp](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-8-largest-product-in-a-series). I preferred not to include the entire data structure just to save me the pain of cluttering the notes.

### `length - n + 1`

I was first tempted to actually consider the product of the first `n`th numbers, then continue one value at a time pondering whether or not the new value would make for a larger product. This is however a very inefficient approach, as it would require to consider the thousand digits array `1000 - n` times.

Actually `1000 - n + 1`. Consider the following, with an array of length `8` and the assumption that we are looking for the greatest product out of `4` contiguous characters.

```js
let digits = [4, 7, 6, 5, 1, 9, 9, 9];
```

Here we would need to check the array five times:

- `4*7*6*5`
- `7*6*5*1`
- `6*5*1*9`
- `5*1*9*9`
- `1*9*9*9`

Intuitively, when you have an array `n` characters long, you have to at least check for it once. I might have another idea in mind, but let's try to code this up.

I will use a smaller array just to explain my thinking with less overhead.

```js
function largestProductinaSeries(n) {
  let tenDigits = [7, 3, 1, 6, 7, 1, 7, 6, 5, 3];
  return true;
}

largestProductinaSeries(13);
```

This is actually a good opportunity to practice with a `reduce` function. It might even be an elegant solution, even if not the final one. Consider the output of the `reduce` function, an object describing the `n` contiguous characters and their product might be enough.

```js
function largestProductinaSeries(n) {
  let tenDigits = [7, 3, 1, 6, 7, 1, 7, 6, 5, 3];
  return tenDigits.reduce(
    (acc, curr) => {
      // work-in-progress
    },
    {
      digits,
      product
    }
  );
}
```

Using the index and the input array provided as arguments beyond `acc` and `curr`, we can actually slice the array to consider `n` characters until the current value. It seems futile to consider an array smaller than `n` characters, but one step at a time.

```js
function largestProductinaSeries(n) {
  let tenDigits = [7, 3, 1, 6, 7, 1, 7, 6, 5, 3];
  return tenDigits.reduce(
    (acc, curr, index, arr) => {
      const digits = arr.slice(index - n, index);
      const product = digits.reduce((acc, curr) => acc * curr, 1);

      return acc.product > product
        ? acc
        : {
            digits,
            product
          };
    },
    {
      digits: [],
      product: 0
    }
  );
}
```

This should actually be enough to describe the largest product and the contiguous values making up such a value.

```js
largestProductinaSeries(4); // { digits: [7, 1, 7, 6], product: 294}
```

Nifty.

Since we care about the product, we can return the integer alone, and the problem should be solved.

```js
function largestProductinaSeries(n) {
  let tenDigits = [7, 3, 1, 6, 7, 1, 7, 6, 5, 3];
  const reducer = tenDigits.reduce(
    (acc, curr, index, arr) => {
      const digits = arr.slice(index - n, index);
      const product = digits.reduce((acc, curr) => acc * curr, 1);

      return acc.product > product
        ? acc
        : {
            digits,
            product
          };
    },
    {
      digits: [],
      product: 0
    }
  );

  return reducer.product;
}
largestProductinaSeries(4); // 294
```

And, almost surprisingly, it does work.

---
