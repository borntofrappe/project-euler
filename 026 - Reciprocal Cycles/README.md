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
125 | 18
```

- divide `125` by `18`. Considering integer division, you get `6` with a remainder of `17`

```code
125 | 18 = 6
 17
```

- divide `17` by `18`. Finding the value less than `1`, add a `0` and compute `170/18` instead. Since the value was insufficient, tag a decimal point on the result as well.

```code
125 | 18 = 6.
 170
```

- `170/18` gives `9` with a remainder of `8`

```code
125 | 18 = 6.9
 170
   8
```

The process continues adding the value returned by the integer division in the result (`6.9....`). This until the remainder reaches `0`, or the remainder repeats itself.

```code
125 | 18 = 6.944
 170
   80
    80
```

In this instance `80/18` returns `4`, with a remainder of `8`. This prompts again `80/18`, which means that `4` is the repeating pattern for `125/18`:

```code
125 | 18 = 6.9(4)
```

Seems to check out:

```js
125 / 18; // 6.944444444444445
```

### longDivision
