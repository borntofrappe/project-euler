# [Digit n Powers](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-30-digit-n-powers)

## Problem

> Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:
>
> 1634 = 1^4 + 6^4 + 3^4 + 4^4
>
> 8208 = 8^4 + 2^4 + 0^4 + 8^4
>
> 9474 = 9^4 + 4^4 + 7^4 + 4^4
>
> As 1 = 1^4 is not a sum it is not included.
>
> The sum of these numbers is 1634 + 8208 + 9474 = 19316.
>
> Find the sum of all the numbers that can be written as the sum of `n` powers of their digits.

## Setup

```js
function digitnPowers(n) {
  // Good luck!
  return n;
}

digitnPowers(5);
```

## Notice

The code described in both scripts gives rise to a potential infinite loop. When testing the project [on the freeCodeCamp platform](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-30-digit-n-powers) however, the code passes the tests, albeit slowly. In the developer console both approaches actually produce the desired result, and rather rapidly.

## Notes

Finding whether or not a number can be expressed as the sum of its digits elevated by `n` is not problematic. What is problematic is locating the upper limit: when should we stop testing the previous condition?

### numberDigits

I can think of two approaches to divvy up the digits of an arbitrary `n` number.

```js
function numberDigits(n) {
  // Good luck
}
```

1. coerce the number to a string. Once you have a string, you can rapidly separate each individual character in an array, and then go back to integer values with the `parseInt` function.

   ```js
   function numberDigits(n) {
     return n
       .toString()
       .split("")
       .map(num => parseInt(num, 10));
   }

   numberDigits(12); // [1, 2]
   ```

1. use the modulo operator. It's a tad hard to visualize, but the idea is to progressively decrement the input value until we find the last valuable digit. Let me explain with a hard-coded value.

   ```js
   145;
   ```

   Starting with `145`, we consider the integer division and the remainder between `145` and `10`

   ```js
   145;
   // integer division
   145 / 10; // 14.5
   Math.floor(145 / 10); // 14
   // remainder
   145 % 10; // 5
   ```

   As you can spot, the remainder provides the last digit, while the integer division separates the rest of the number. Continuing with `14`

   ```js
   Math.floor(14 / 10); // 1
   14 % 10; // 4
   ```

   We find the digit `4`. Finally, checking for `1`

   ```js
   Math.floor(1 / 10); // 0
   1 % 10; // 1
   ```

   We reach `0`, and in the process we have found `5`, `4`, and `1`. I find the string approach to be easier to read, but this method makes due without coercing the values back and forth.

   ```js
   function numberDigits(n) {
     let num = n;
     const digits = [];
     while (num > 0) {
       digits.push(num % 10);
       num = Math.floor(num / 10);
     }
     return digits;
   }

   numberDigits(12); // [2, 1]
   ```

Both approaches work, and provide the digits of the input `n`. The latter of the two shows the digits in reverse order, but since we care about the sum of their exponent, the order does not matter. This would also be trivially resolved by reversing the `digits` array.

### sumDigitsPowers

Once we are able to find the digits of a number, the next step is computing the sum of their powers, considering the input exponent. We can accomplish this task for every digit found with the previous logic.

```js
function sumDigitsPowers(digits, power) {
  return digits.reduce((acc, curr) => acc + curr ** power, 0);
}

sumDigitsPowers([1, 2], 3); // 9
```

However, since we are bound to consider the powers countless number of times, it is advisable to compute the powers of the first nine digits, and then refer to the matching digit as we need to find their sum.

```js
function sumDigitsPowers(digits, n) {
  const powers = Array(10)
    .fill(0)
    .map((value, index) => index ** n);

  return digits.reduce((acc, curr) => acc + powers[curr], 0);
}

sumDigitsPowers([1, 2], 3); // 9
```

This seems inefficient for a single array of digits, but as we later consider more and more numbers, it starts to make life easier.

### maxDigits

This is actually the tricky part of the problem, and what stumped me for a good day and a half. We can now consider if a number can be described as the sum of its digits, elevated to an arbitrary number. Where do we actually stop, however? If we set up a loop starting from `10`, the first value providing a sum between two digits, what number describes the end of the loop?

The answer seems to come by considering the impact of an additional digit, and the maximum value which can be expressed with the newfound number of digits.

Consider for instance elevating the digits to the power of `3`. Starting with two digits, the sum of its greatest possible unit values is `9**3+9**3`, or `2*9**3`, which is `1458`. For three digits, it's `3*9**3`, which is `2187`.

Continuing with a table:

| digits | sumDigits |
| ------ | --------- |
| 99     | 1458      |
| 999    | 2187      |
| 9999   | 2916      |

As we add new digits, the sum of their powers increases by a smaller factor. Once we reach four digits and `9999`, we find that the number surpasses the sum of its digits elevated by `3`. This means there cannot be a greater number that fulfills the condition.

A similar logic is applied to higher exponents. For the power of `4`, for instance.

| digits | sumDigits |
| ------ | --------- |
| 99     | 13122     |
| 999    | 19683     |
| 9999   | 26244     |
| 99999  | 32805     |

In code:

```js
function maxDigits(n) {
  let digits = 1;
  while (10 ** digits - 1 < digits * 9 ** n) {
    digits += 1;
  }
  return digits;
}

maxDigits(3); // 4
maxDigits(4); // 5
```

### digitnPowers

Trying to tie everything together, let's start from the given prompt. First, we retrieve the upper threshold with the `maxDigits` function.

```js
function digitnPowers(n) {
  const lowerThreshold = 10;
  const upperThreshold = 10 ** maxDigits(n) - 1;
}
```

Then, we compute the powers of the possible unit values.

```js
function digitnPowers(n) {
  const lowerThreshold = 10;
  const upperThreshold = 10 ** maxDigits(n) - 1;
  const powers = Array(10)
    .fill(0)
    .map((value, index) => index ** n);
}
```

Within a for loop then, we check if a counter variable `i` can be described as the sum of its digits, elevated by `n`

```js
function digitnPowers(n) {
  const lowerThreshold = 10;
  const upperThreshold = 10 ** maxDigits(n) - 1;
  const powers = Array(10)
    .fill(0)
    .map((value, index) => index ** n);

  for (let i = lowerThreshold; i < upperThreshold; i += 1) {
    const digits = i
      .toString()
      .split("")
      .map(num => parseInt(num, 10));
    const sum = digits.reduce((acc, curr) => acc + powers[curr], 0);

    if (i === sum) {
    }
  }
}
```

If it matches, we then increment a variable by the same value. This means we need a variable in which to keep track of the total.

```js
function digitnPowers(n) {
  const lowerThreshold = 10;
  const upperThreshold = 10 ** maxDigits(n) - 1;
  const powers = Array(10)
    .fill(0)
    .map((value, index) => index ** n);

  let total;
  for (let i = lowerThreshold; i < upperThreshold; i += 1) {
    const digits = i
      .toString()
      .split("")
      .map(num => parseInt(num, 10));

    const sum = digits.reduce((acc, curr) => acc + powers[curr], 0);

    if (i === sum) {
      total += i;
    }
  }

  return total;
}
```

A variable which is then returned to provide the answer to the problem at hand.

```js
console.log(digitnPowers(3)); // 1301
console.log(digitnPowers(4)); // 19316
console.log(digitnPowers(5)); // 443839
```

There is a potential infinite loop, however.

## Wrap Up?

I am afraid the notes are less explanatory than previous challenges, and I cannot close the project with the same level of confidence. The logic is sound, but the approach must be improved in some way which eludes me. If you know the way, I plead you, let me know about it [@borntofrappe](https://twitter.com/borntofrappe). Luckily for me, the exercise has still been a good excuse to practice with JavaScript and array methods.
