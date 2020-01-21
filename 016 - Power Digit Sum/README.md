# [Power Digit Sum](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-16-power-digit-sum)

## Problem

> `2^15` = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
>
> What is the sum of the digits of the number `2^exponent`?

## Setup

```js
function powerDigitSum(exponent) {
  // Good luck!
  return true;
}

powerDigitSum(15);
```

## Notes

The most direct approach is meant to fail, but nonetheless worth a mention. If anything, to see why the failure occurs.

- compute the result of `2^exponent`

  ```js
  function powerDigitSum(exponent) {
    const result = 2 ** exponent;
  }
  ```

- coerce the result into a string,

  ```js
  function powerDigitSum(exponent) {
    const result = 2 ** exponent;
    return result.toString();
  }
  ```

- split the characters into an array to consider the values individually

  ```js
  function powerDigitSum(exponent) {
    const result = 2 ** exponent;
    return result.toString().split("");
  }
  ```

- use a reduce function to add up the values.

  ```js
  function powerDigitSum(exponent) {
    const result = 2 ** exponent;
    return result
      .toString()
      .split("")
      .reduce((acc, curr) => acc + parseInt(curr), 0);
  }
  ```

  I could have mapped the array to parse the characters separately, but decided to include the function in the `reduce` call instead.

This actually works for small values:

```js
powerDigitSum(15); // 26
```

But for larger quantities, it returns something less desirable.

```js
powerDigitSum(128); // NaN
```

Why not a number?

If you were to compute `2**128`, you'd find the result expressed in exponent notation.

```js
2 ** 128; // 3.402823669209385e+38
```

This means that when we loop through the individual characters, we stumble up `parseInt('.')`, which returns `NaN`. The addition between `NaN` and any integer value returns always `NaN`, to that we eventually retrieve the specific value.

Notice that `e` and `+` also return `NaN` when included as the argument of the `parseInt` function.

Clearly, `NaN` is not a valid solution. The exploration of the direct approach is however worth the failure.

## Important Notice

I used `parseInt` without specifying the radix. ESlint usually shamed me into attaching the value, most likely `10`, but I always suspected this was the default value. Reaching the [mdn docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#Description) however, I was horrified to learn this is not the case. It tends to be, and for most cases it should be thanks to the implementation of ES5, but to save oneself from a likely headache, it is worth to add three or four more characters.

```diff
-parseInt(num)
+parseInt(num, 10)
```

## Notes / 2

Coming back to the project at hand, and trying to solve the sum of the individual digits, I am reminded of problem #13. Back then, we found a way around the constraint posed by exponent notation, but also mentioned a possible alternative approach by considering the addition as performed in elementary school.

```code
159  +
321
---
480
```
