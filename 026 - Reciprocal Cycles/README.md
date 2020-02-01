# [Reciprocal Cycles](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-26-reciprocal-cycles)

## Problem

> A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:
>
> 1/2 = 0.5
>
> 1/3 = 0.(3)
>
> 1/4 = 0.25
>
> 1/5 = 0.2
>
> 1/6 = 0.1(6)
>
> 1/7 = 0.(142857)
>
> 1/8 = 0.125
>
> 1/9 = 0.(1)
>
> 1/10 = 0.1
>
> Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that `1/7` has a 6-digit recurring cycle.
>
> Find the value of `d < n` for which `1/d` contains the longest recurring cycle in its decimal fraction part.

## Setup

```js
function reciprocalCycles(n) {
  // Good luck!
  return n;
}

reciprocalCycles(1000);
```

## Notes

Looking at the most straightforward approach: divide by `d`, use a regular expression to find the largest available repeating pattern, the shortcomings from regular division come blatantly apparent.

```js
1 / 3; // 0.3333333333333333
1 / 7; // 0.14285714285714285
```

The number is truncated after a rather unpredictable number of values.

Picking up from a couple of previous projects, where we computed the multiplication of very large numbers with the tried and true approach taught in elementary school, we might find a solution computing the division with a series of steps.

Apparently, the approach is called [long division](https://en.m.wikipedia.org/wiki/Long_division). Whichever way you label it, it should work as follows. I'll use an arbitrary value to illustrate the point.

```code
125 : 18
```

- divide `125` by `18`. Considering integer division, you get `6` with a remainder of `17`

```code
125 : 18 = 6
 17
```

- divide `17` by `18`. Finding the value less than `1`, add a `0` and compute `170/18` instead. Since the value was insufficient, tag a decimal point on the result as well.

```code
125 : 18 = 6.
 170
```

- `170/18` gives `9` with a remainder of `8`

```code
125 : 18 = 6.9
 170
   8
```

The process continues adding the value returned by the integer division in the result (`6.9....`). This until the remainder reaches `0`, or a remainder repeats itself.

```code
125 : 18 = 6.944
 170
   80
    80
```

In this instance `80/18` returns `4`, with a remainder of `8`. This prompts again `80/18`, which means that `4` is the repeating pattern for `125/18`:

```code
125 : 18 = 6.9(4)
```

Seems to check out:

```js
125 / 18; // 6.944444444444445
```

### longDivision

Before we dive in the code describing a division between two arbitrary values, a word on the repeating pattern we are ultimately looking for.

In some instances, like `125/18` or `1/3`, the pattern repeats itself over and over.

```code
125 : 18 = 6.9(4)
1 : 3 = 0.(3)
```

Looking at values like `1/7` however, the pattern emerges only after a few digits.

```code
1 : 7 = 0.(142857)
```

In this instance, we should stop when we find `1` once more. What's more, we should stop when, upon finding `1`, we find the same remainder. When these two match, the sequence coming before it is bound to repeat itself.

Back to the function:

```js
const longDivision = (x, y) => {};
```

Since we need to keep track of the remainders, the idea is to set up an array in which to store each successive step.

```js
const longDivision = (x, y) => {
  const sequence = [
    {
      dividend: x,
      divisor: y,
      quotient: `${Math.floor(x / y)}`,
      remainder: x % y
    }
  ];
};
```

Separate from the array, another variable is initialized to store the repeating pattern.

```js
const longDivision = (x, y) => {
  const sequence = [
    {
      dividend: x,
      divisor: y,
      quotient: `${Math.floor(x / y)}`,
      remainder: x % y
    }
  ];

  let pattern;
};
```

From this setup, the idea is to continue looping until one of two conditions is met:

- the remainder is equal to `0`. More precisely, the remainder of the last item in the array is equal to `0`

- there exist a repeating pattern

```js
while (sequence[sequence.length - 1].remainder !== 0 && !pattern) {}
```

In the loop, we just need to sure the conditions are met. One of them at least.

Implementing the process detailed above, we start by collecting the information from the previous iteration.

```js
while() {
    let { dividend, divisor, quotient } = sequence[sequence.length - 1];
}
```

`let` since we are bound to update the value held by both `dividend` and `quotient`.

The first step is computing the integer division between the dividend and divisor.

```js
while() {
    let { dividend, divisor, quotient } = sequence[sequence.length - 1];

    let integerDivision = Math.floor(dividend / divisor);
}
```

If this value is less than `1`, we must make sure to:

1. add a decimal point, if one is not already considered in the `quotient` string

   ```js
   while() {
      let { dividend, divisor, quotient } = sequence[sequence.length - 1];

      let integerDivision = Math.floor(dividend / divisor);

      if(!quotient.includes(".") && integerDivision < 1) {
        quotient += '.';
      }
   }
   ```

1. multiply the value by `10`, until we find a positive integer division

   ```js
   while() {
      let { dividend, divisor, quotient } = sequence[sequence.length - 1];

      let integerDivision = Math.floor(dividend / divisor);

      if(!quotient.includes(".") && integerDivision < 1) {
        quotient += '.';
      }

      while(integerDivision < 1) {
        dividend *= 10;
        integerDivision = Math.floor(dividend / divisor);
      }
   }
   ```

It looks like a lot, but we are walking through the exact steps mentioned in the long division section. Past this nested loop, we now have a positive integer division, and can account for the remainder of the division which follows.

```js
const remainder = dividend % divisor;
quotient += integerDivision;
```

We then push an object with the updated values in the `sequence` array:

```js
const remainder = dividend % divisor;
quotient += integerDivision;

sequence.push({
  dividend: remainder,
  divisor,
  quotient,
  remainder
});
```

Notice how `dividend` is updated to consider the new remainder. This is in line with the long division explained above.

Before you go out running the code, be warned that it might generate an infinite loop. This is because we don't account, yet, for a repeating pattern. Luckily, the repeating pattern can be identified by looking for a previous item which has the same dividend and remainder:

```js
const remainder = dividend % divisor;
quotient += integerDivision;

const match = sequence.find(element => element.dividend === dividend && element.remainder === remainder);

sequence.push({
  dividend: remainder,
  divisor,
  quotient,
  remainder
});
```

Notice how we are looking for a match _before_ the new item is added to the sequence. As the item is added, the `find` function would immediately find the same value.

Since we care about the pattern however, `find` might actually not be the best option. `findIndex` allows to find the index in the `sequence` array, so that we can rapidly retrieve the pattern by slicing the `quotient` string.

```js
const index = sequence.findIndex(element => element.dividend === remainder && element.remainder === remainder);
```

If a value different from `-1` is found (`-1` meaning no match has been found), we then proceed to consider the pattern starting from the index. Actually from the index, but also from where the decimal digits begin.

```js
const index = sequence.findIndex(element => element.dividend === remainder && element.remainder === remainder);

if (index !== -1) {
  const decimal = quotient.split("").findIndex(value => value === ".");
  pattern = quotient.slice(decimal + index + 1);
}
```

Again, it is a lot to digest, and for clarify, I decided to store the code in `longDivision.js`.

We are currently able to find each and every step in the sequence, but of course we finally need to output the result of the _long_ division.

```js
return sequence[sequence.length - 1].quotient;
```

We output the quotient ultimately held by the very last item in the `sequence` array.

### divisionPattern

For the problem at hand, `longDivision` is certainly helpful, but actually provides a solution that is too general in scope. In `divisionPattern` we receive as input a single value `d`, and return the repeating pattern of `1/d`.

The code is eerily similar to the one described in the previous section, so I'll spare you too many details. The most prominent changes relate to:

- consider `1` in the first iteration

```js
const sequence = [
  {
    dividend: 1,
    divisor: d,
    quotient: `${Math.floor(1 / d)}`,
    remainder: 1 % d
  }
];
```

- return the pattern, if available

```js
return pattern ? pattern : null;
```

### reciprocalCycles

Since we are interested in the value `d` which generates the longest repeating pattern, we set up an object in which to keep track of both values.

```js
function reciprocalCycles(n) {
  const cycle = {
    d: 0,
    pattern: ""
  };
}
```

In a `for` loop, we then retrieve the pattern with the `divisionPattern` function, and update both properties if necessary. Most prominently, if the length of the new pattern exceeds the existing one.

```js
function reciprocalCycles(n) {
  const cycle = {
    d: 0,
    pattern: ""
  };
  for (let i = 2; i < n; i += 1) {
    const pattern = divisionPattern(i);
    if (pattern && pattern.length > cycle.pattern.length) {
      cycle.d = i;
      cycle.pattern = pattern;
    }
  }
}
```

Past the loop, we can finally return the value required to clear the challenge. That is, the number generating the pattern.

```js
function reciprocalCycles(n) {
  const cycle = {
    d: 0,
    pattern: ""
  };
  for (let i = 2; i < n; i += 1) {
    const pattern = divisionPattern(i);
    if (pattern && pattern.length > cycle.pattern.length) {
      cycle.d = i;
      cycle.pattern = pattern;
    }
  }
  return cycle.d;
}
```

---

It took quite a while, certainly a lot more effort than the previous problem, but we eventually cleared the challenge with a rather beautiful function. Beautiful, if long. If you have an improvement in mind, or a better solution altogether, let me know [@borntofrappe](https://twitter.com/borntofrappe).
