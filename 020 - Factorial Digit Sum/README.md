# [Factorial Digit Sum](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-20-factorial-digit-sum)

## Problem

> n! means n × (n − 1) × ... × 3 × 2 × 1
>
> For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
> and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
>
> Find the sum of the digits `n!`

## Setup

```js
function sumFactorialDigits(n) {
  // Good luck!
  return n;
}

sumFactorialDigits(100);
```

## Notes

Unfortunately, it is not enough to compute the factorial and add up the newfound digits.

```js
const factorial = n => {
  if (n <= 1) {
    return 1;
  }

  return n * factorial(n - 1);
};

function sumFactorialDigits(n) {
  const factor = factorial(n);
  return `${factor}`.split("").reduce((acc, curr) => acc + parseInt(curr, 10), 0);
}
```

This might work for small numbers.

```js
sumFactorialDigits(5); // 3 as in 1+2+0
sumFactorialDigits(10); // 27 as in 3+6+2+8+8+0+0
```

But once we reach higher values, the function doesn't return the desired value.

```js
sumFactorialDigits(50); // NaN
```

It returns `NaN` since the factorial of `50` is computed with exponent notation, as `3.0414093201713376e+64`. Once we reach the dot or the plus sign, we try to unsuccessfully coerce the string to an integer and find `NaN` instead.

This is exactly the same situation found in problem #16. There we needed to sum the digits of `2**exponent`, and we managed to work around the limitations of the exponent notation by multiplying an ever greater number digit by digit.

```code
  563  x
    2
 ----
 1126
```

Here, we need to expand the same approach to consider a multiplicand and multiplier of multiple digits. In other words, we need a function which receives as input two numbers, and goes through the steps of multiplying said numbers by in the necessary rows and columns.

Consider for instance: `24*23`

```code
   24 x
   23
-----
   72
  48- +
-----
  552
```

### Multiplication

To multiply the values digit by digit, we start by creating a function which receives as input a number, and returns an array storing the individual digits.

```js
const digits = number => `${number}`.split("").map(num => parseInt(num, 10));
```

We could separate the individual digits directly in the multiplication function, but I find this approach to be less distracting. We can now focus on the multiplication following the above example.

```js
const multiplication = (multiplicand, multiplier) => {
  const digitsMultiplicand = digits(multiplicand);
  const digitsMultiplier = digits(multiplier);

  const digitsProduct = [];
};
```

`digitsProduct` is where we plan to store the rows of the product.

We start by looping through the multiplier's digit. Following the example however, we must be sure to loop from the end of the array, as to consider the numbers on the right first.

```js
const multiplication = (multiplicand, multiplier) => {
  const digitsMultiplicand = digits(multiplicand);
  const digitsMultiplier = digits(multiplier);

  const digitsProduct = [];
  let indexRow = 0;
  for (let i = digitsMultiplier.length - 1; i >= 0; i -= 1) {
    // multiply individual digit

    // next row
    indexRow += 1;
  }
};
```

In `digitsProduct` we are going to store the result of the multiplication between individual digits.

Notice that I also included a counter variable in `indexRow`. The idea is to increment this value with each digit of the multiplier, to literally shift the position of the product. This is in line with the example above, in which a dash `-` was included for each new digit of the second member.

Looping through the multiplicand's digits, we can then compute the actual product and update `digitsProduct` accordingly.

```js
const multiplication = (multiplicand, multiplier) => {
  const digitsMultiplicand = digits(multiplicand);
  const digitsMultiplier = digits(multiplier);

  const digitsProduct = [];
  let indexRow = 0;
  for (let i = digitsMultiplier.length - 1; i >= 0; i -= 1) {
    let indexColumn = 0;
    for (let j = digitsMultiplicand.length - 1; j >= 0; j -= 1) {
      // multiply

      // next column
      indexColumn += 1;
    }

    // next row
    indexRow += 1;
  }
};
```

`indexColumn` is specified as yet another counter variable, but this time to shift the position within `digitsProduct` for each number in the multiplicand's array.

We can now compute the product, and add the value in the array at the precise index. One small precaution, however. `digitsProduct` starts out as an empty array, and for the first series of operations, we set out to assign the product value. After each iteration however, we need to increment the existing value with the newfound result. In other words, the product is meant to increment the existing value, or otherwise set a new value.

```js
const multiplication = (multiplicand, multiplier) => {
  const digitsMultiplicand = digits(multiplicand);
  const digitsMultiplier = digits(multiplier);

  const digitsProduct = [];
  let indexRow = 0;
  for (let i = digitsMultiplier.length - 1; i >= 0; i -= 1) {
    let indexColumn = 0;
    for (let j = digitsMultiplicand.length - 1; j >= 0; j -= 1) {
      // multiply
      const digitProduct = digitsMultiplier[i] * digitsMultiplicand[j];

      const index = indexRow + indexColumn;
      if (digitsProduct[index] !== undefined) {
        digitsProduct[index] += digitProduct;
      } else {
        digitsProduct[index] = digitProduct;
      }

      // next column
      indexColumn += 1;
    }

    // next row
    indexRow += 1;
  }
  return digitsProduct;
};
```

It looks a tad convoluted, but once you break down the order of the operations, how each iteration moves the index according to the multiplier and multiplicand's digits, it actually makes a lot of sense.

And with an arbitrary set of values:

```js
multiplication(25, 24); // [20, 18, 4]
```

The function does not return the desired values. This however, is for a very good reason. Each digit describes the column at the end of the operation, but we did not carry the excess for the tens column.

Considering the `[20, 18, 4]` array:

- carry the `2`

  ```js
  [0, 20, 4];
  ```

- carry the `2`

  ```js
  [0, 0, 6];
  ```

Doesn't that look nice. It's reversed in order, but it clearly describes the result of `25*24`.

In code, and past the for loops multiplying the individual digits, we replicate this operation by looping through the `digitsProduct` array one last time.

```js
for (let i = 0; i < digitsProduct.length; i += 1) {
  if (digitsProduct[i] >= 10) {
    const tens = Math.floor(digitsProduct[i] / 10);
    digitsProduct[i] -= tens * 10;
    if (digitsProduct[i + 1]) {
      digitsProduct[i + 1] += tens;
    } else {
      digitsProduct[i + 1] = tens;
    }
  }
}
```

And finally return the desired result by reversing the array in place.

```js
return digitsProduct.reverse();
```

It is quite a complex function, but once you understand the way we move within `digitsProduct` and the way we consider the digits of the two members _backwards_, it starts to make a whole lot of sense. In the `multiplication.js` script you find the entire function, just to be safe.

<!-- ### Wrap Up -->
