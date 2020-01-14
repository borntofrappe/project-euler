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

Please note that the `thousandDigits` array is supposed to contain one thousand digits, as specified [in the problem on freeCodeCamp](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-8-largest-product-in-a-series). I preferred not to include the entire data structure just to save me the pain of cluttering this document.

### tenDigits

I was first tempted to actually consider the product of the first `n`th numbers, then continue one value at a time pondering whether or not the new value would make for a larger product. This might be inefficient, as it would require to consider the thousand digits array `1000 - n` times, but let's try to translate the idea into code.

Actually `1000 - n + 1`. Consider the following, with an array of length `8` and the assumption that we are looking for the greatest product out of `4` contiguous characters.

```js
let digits = [4, 7, 6, 5, 1, 9, 9, 9];
```

Here we would need to check the array `5` times:

- `4*7*6*5`
- `7*6*5*1`
- `6*5*1*9`
- `5*1*9*9`
- `1*9*9*9`

Intuitively, when you have an array `n` characters long, you have to at least check for it once.

I will use a smaller array just to explain my thinking with less overhead.

```js
// setup
function largestProductinaSeries(n) {
  let tenDigits = [7, 3, 1, 6, 7, 1, 7, 6, 5, 3];
  return true;
}

largestProductinaSeries(13);
```

This is actually a good opportunity to practice with a `reduce` function. It might even be an elegant solution, even if not the final one. For the output of the `reduce` function, an object describing the `n` contiguous characters and their product might be enough.

```js
function largestProductinaSeries(n) {
  let tenDigits = [7, 3, 1, 6, 7, 1, 7, 6, 5, 3];
  return tenDigits.reduce(
    (acc, curr) => {
      // work-in-progress
    },
    {
      digits: [],
      product: 0
    }
  );
}
```

Using the index and the input array provided as arguments past `acc` and `curr`, we can actually slice the array to consider `n` characters until the current value. It seems futile to consider an array smaller than `n` characters, but one step at a time.

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

At each iteration, we consider a subset of the input array, until the current value. We then compute the product of the digits described in this array, and update the object only if this value is greater than the previous value.

This should actually be enough to describe the largest product and the contiguous values making up such a value.

```js
largestProductinaSeries(4); // { digits: [7, 1, 7, 6], product: 294}
```

Nifty.

Since we care about the product, we can return the integer alone, and the problem should be then solved.

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

And, almost surprisingly, it is solved.

### Wrap Up

I've become accustomed to a certain degree of failure in this challenge, so excuse my surprise. What I find astonishing is that not only the code works, but it is almost elegant in its simplicity. You have to understand the `reduce` function, that is unfortunately a given, but coming after the previous problems, prime numbers, and recursion, I find it difficult not to notice the difference.

---

Reading through the notes, I actually noticed I was doubting whether this approach would be a valid one, and momentarily thought of another solution using regular expressions. Perhaps it would have been dumber, but the idea was to look through the array for the highest possible value, an integer of `n` digit, all of which describing the number `9`, and then decrementing this value until the first match was found. This could get quickly out of hand though. In a situation where there's no `9` for instance, you'd loop through a thousand values, at least, without a possible match, but exploring the idea further might make it a viable solution.

I might consider an update in the future, but satisfied with the (two) `reduce` function, I'll gladly close the problem with the solution described in the script. If you explore that approach, or any alternative approach for that matter, you know where to reach me: [@borntofrappe](https://twitter.com/borntofrappe).

### Update

While exploring problem #11, I found a more efficient solution using a `for` loop, and reducing the number of checks necessary to find the largest product. I decided to maintain the solution described in this page in the `reduce.js` script, and detail the better approach in `script.js`. The improvement means the loop now considers only the product of arrays of `n` items.
