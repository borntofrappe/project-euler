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

- coerce the result into a string

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

I used `parseInt` without specifying the radix. ESlint usually shamed me into attaching the value, which I'd most likely set to `10`, but I always suspected this was the default value. Reaching the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#Description) however, I was horrified to learn this is not the case. It tends to be, and for most cases it should be thanks to the implementation of ES5, but to save oneself from a likely headache, it is worth to add three or four more characters.

```diff
-parseInt(num)
+parseInt(num, 10)
```

## Notes /2

Coming back to the project at hand, I am reminded of problem #13. Back then, we found a way around the constraint posed by exponent notation, but also mentioned an alternative approach in considering the addition as performed in elementary school.

```code
159  +
321
---
480
```

Here the approach is similar, just repurposed to consider a multiplication.

```code
  563  x
    2
 ----
 1126
```

Each number, starting from the end, is multiplied by 2. If it exceeds `10`, we consider the unit and increment the value coming earlier in the expression by one.

```code
2*3=6 -> 6
2*6=12 -> 2 (carry the 1)
2*5=10 -> 11 (adding the previous 1)
```

Let me try to elaborate in code. We start with an array with the base as its single value, `2`.

```js
const digits = [2];
```

We then proceed to loop from `1` up to the quantity described by the input argument.

```js
const digits = [2];
for (let i = 1; i < exponent; i += 1) {}
```

The idea is to continue multiplying the items of the `digits` array, by `2` and for as many times as described by exponent.

```js
const digits = [2];

for (let i = 1; i < exponent; i += 1) {
  const { length } = digits;
  for (let j = 0; j < length; j += 1) {
    digits[j] *= 2;
  }
}
```

Of course this would be pointless without considering the logic described by the previous example:

- if the digit exceeds the unit value, consider only the unit

  ```js
  const digits = [2];

  for (let i = 1; i < exponent; i += 1) {
    const { length } = digits;
    for (let j = 0; j < length; j += 1) {
      digits[j] *= 2;
      if (digits[j] >= 10) {
        digits[j] -= 10;
      }
    }
  }
  ```

- carry the 1 to the digit which follows. This, however, only if the digit which follows does exist. Consider `[8]`: we double the value, consider the unit and are left to carry `1` to a digit that is not available. In this instance we make sure to append a new item to the array.

  ```js
  const digits = [2];

  for (let i = 1; i < exponent; i += 1) {
    const { length } = digits;
    for (let j = 0; j < length; j += 1) {
      digits[j] *= 2;
      if (digits[j] >= 10) {
        digits[j] -= 10;
        if (j === length - 1) {
          digits.push(1);
        } else {
          digits[j + 1] += 1;
        }
      }
    }
  }
  ```

Does not work.

I'm positive you already see the fallacy in the nested for loop, but let me trying detailing why the code does not work with a trivial example.

Consider a situation in which `digits` stores the following values: `[6, 5, 2]`. Walking through the for loop:

- double the first item, `6x2 = 12`

- the value exceeds `10`, so we consider the unit `2`

- add `1` to the digit which follows: `5+1=6`. Oh no, you might add.

- double the second item, which is unfortunately and already incremented by 1: `6*2=12`.

We are essentially messing up the order of the operations. One way we can solve this issue is by actually walking the array _backwards_:

- double the last item: `2*2=4`

- double the penultimate value: `5*2=10`

- consider the unit: `0`

- carry the 1 to the value which follows: `4+1=5`

Isn't that nice.

Updating the for loop:

```diff
- for(let j = 0; j < length; j += 1) {
+ for(let j = length - 1; j >= 0; j -= 1) {
```

And this works as one would hope. For instance, let's try to display the digits for a couple of arbitrary values.

```js
function powerDigitSum(exponent) {
  const digits = [2];
  for (let i = 1; i < exponent; i += 1) {
    const { length } = digits;
    for (let j = length - 1; j >= 0; j -= 1) {
      digits[j] *= 2;
      if (digits[j] >= 10) {
        digits[j] -= 10;
        if (j === length - 1) {
          digits.push(1);
        } else {
          digits[j + 1] += 1;
        }
      }
    }
  }
  return digits;
}
powerDigitSum(5); // [2, 3]
powerDigitSum(15); // [8, 6, 7, 2, 3]
```

### Wrap Up

While we succeeded in finding the digits of `2^exponent`, that is not the end of the challenge. We care about the _sum_ of these digits, and this can be retrieved with a handy `reduce` function. It has almost become a staple in this series of projects, and it allows to find the desired value with one line of code.

```js
return digits.reduce((acc, curr) => acc + curr, 0);
```

---

This was quite a successful project, which lead me to learn more about the `parseInt` function, and think more carefully about the direction of a for loop. If you've learned something too, feel free to brag about it [@borntofrappe](https://twitter.com/borntofrappe).
