# [Amicable Numbers](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-21-amicable-numbers)

## Problem

> Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
>
> If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.
>
> For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
>
> Evaluate the sum of all the amicable numbers under n.

## Setup

```js
function sumAmicableNum(n) {
  // Good luck!
  return n;
}

sumAmicableNum(10000);
```

## Notes

It is likely I will need to go through the Wiki page on [amicable numbers](https://en.wikipedia.org/wiki/Amicable_numbers), but not until I've given the challenge a fair chance.

Starting from the given pair, `220` and `284` are amicable numbers because:

- the factors of `220` are: 1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110. These add up to `284`

- the factors of `284` are: 1, 2, 4, 71, 142. These add up to `220`

This is redundant, but I struggled to understand what amicable numbers are and spelling it out this way helped me out.

### properDivisors

The solution will be at first utterly inefficient, but let's try to create a function which receives as input two numbers and checks whether or not they are amicable.

To do this, let's first create a function to find the factors of an input number.

```js
function properDivisors(num) {
  const divisors = [];

  for (let i = 1; i <= num / 2; i += 1) {
    if (num % i === 0) {
      divisors.push(i);
    }
  }

  return divisors;
}
```

This works, but picking up from problem #12, we can actually develop a more efficient solution:

```js
function properDivisors(num) {
  const divisors = [];

  for (let i = 1; i <= Math.sqrt(num); i += 1) {
    if (num % i === 0) {
      divisors.push(i);

      const j = num / i;
      if (j !== i && j !== num) {
        divisors.push(j);
      }
    }
  }

  return divisors;
}
```

We consider the square root as the upper threshold, and for every proper divisor `i`, we also consider the matching value for which `i * j = num`. When we have `10` for instance, and find in `2` a proper divisor, we know that `5` is also a factor. `5` as in `10/2`.

Notice I included also `j !== num`, since the problem at hand considers the proper divisors below the input number.

Testing out with a few values:

```js
properDivisors(10); // [1, 2, 5]
properDivisors(20); // [1, 2, 10, 4, 5]
```

Looking at `properDivisors(20)`, the numbers are not in order <!-- you are out of order! -->, and this is because we find `10` before `i` has a chance to reach `4`. This is however not an issue since we care about the sum of the values. If you really wanted the numbers in order. you could sort them quite rapidly anyway:

```js
return divisors.sort((a, b) => a - b);
```

You can find the function, sorting included, in the script bearing the same name.

### areAmicable

This is a rather irresponsible approach, but we can describe if two numbers are amicable by with the `properDivisor` function.

1. find the proper divisors for both numbers

   ```js
   function areAmicable(num1, num2) {
     const factors1 = properDivisors(num1);
     const factors2 = properDivisors(num2);
   }
   ```

1. add the values with a handy reduce function

   ```js
   function areAmicable(num1, num2) {
     const factors1 = properDivisors(num1);
     const factors2 = properDivisors(num2);

     const sum1 = factors1.reduce((acc, curr) => acc + curr, 0);
     const sum2 = factors2.reduce((acc, curr) => acc + curr, 0);
   }
   ```

1. compare the values

   ```js
   function areAmicable(num1, num2) {
     const factors1 = properDivisors(num1);
     const factors2 = properDivisors(num2);

     const sum1 = factors1.reduce((acc, curr) => acc + curr, 0);
     const sum2 = factors2.reduce((acc, curr) => acc + curr, 0);

     if (sum1 === num2 && sum2 === num1) {
       return true;
     }
     return false;
   }
   ```

It can be improved in many ways, from adding the factors immediately as they are returned from the `properDivisor` function to preemptively return false if the first sum is already different from the second number. That being said, it does work.

```js
areAmicable(10, 50); // false
areAmicable(220, 284); // true
```

You can find a slightly improved version in `areAmicable.js`, but here I decided to re-consider the entire function to find a better solution.

This is because, even with the improvements, the code will result in an infinite for loop when considering the numbers below the input value.
