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

You can find the function, sorting included, in `properDivisor.js`.

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

### amicableNumbers

I consider this to be one of my crowning achievements, so bear with me as I try to explain my logic as cleanly as possible.

```js
function amicableNumbers(n) {
  // Good luck
}
```

Inspired by the _Sieve of Eratosthenes_ and the solution of problem #10, let's start with an array with as many as `n` items.

```js
function amicableNumbers(n) {
  const numbers = Array(n);
}
```

Without further specification, `Array(n)` returns an empty array, which will come in rather handy in a moment.

Starting from the `numbers`, the idea is to loop through the array until a condition is met.

```js
function amicableNumbers(n) {
  const numbers = Array(n);

  while (true) {
    // just to be cautious
    break;
  }
}
```

In the `while` loop then, we proceed to "mark", "tag" the individual items with the following algorithm:

- find the index of the first item which is `undefined`

  ```js
  function amicableNumbers(n) {
    const numbers = Array(n);

    while (true) {
      const number = numbers.findIndex(number => number === undefined);

      // just to be cautious
      break;
    }
  }
  ```

- if there is no `undefined` value, `findIndex` returns `-1`, and in this instance we exit the loop.

  ```js
  function amicableNumbers(n) {
    const numbers = Array(n);

    while (true) {
      const number = numbers.findIndex(number => number === undefined);

      if (number === -1) {
        break;
      } else {
        // where the magic happens
      }
    }
  }
  ```

- if there is a match, we then proceed to look for an amicable number. Let's focus on the body of the `else` statement for the next few snippets.

  First, we compute the sum of the factors for the given number.

  ```js
  const sum1 = properDivisors(number).reduce((acc, curr) => acc + curr, 0);
  ```

  - If `sum1` represents a value in the `numbers` array, and an `undefined` value at that, we then continue to consider the sum of the factors for that number

    ```js
    if (sum1 < numbers.length && numbers[sum1] === undefined) {
      const sum2 = properDivisors(sum1).reduce((acc, curr) => acc + curr, 0);
    }
    ```

    Why this condition? `sum1 < numbers.length` guarantees that we are targeting a value in the array. `sum === undefined` guarantees that the value hasn't already "marked", "tagged" as amicable, or not amicable. If either condition is met, the current value cannot have an amicable number below `n`, and we therefore update the value accordingly.

    ```js
    if (sum1 < numbers.length && numbers[sum1] === undefined) {
      const sum2 = properDivisors(sum1).reduce((acc, curr) => acc + curr, 0);
    } else {
      numbers[number] = false;
    }
    ```

    But if both return `true`, we continue in the `if` statement to compare the necessary values.

  - once we compute `sum2`, we have access to three values:

    - `number`, the current value;

    - `sum1` the candidate for amicable number

    - `sum2`, the sum of the factors for the candidate

    If this last sum is equal to the current value, there we have a match. Almost at least.

    Consider the sneaky number `6`: the sum of its factors is, you guessed it, `1+2+3=6`. This means that for the specific value, we would identify two amicable numbers which are one and the same. To avoid this, we can make sure to check that the two numbers differ from one another.

    ```js
    if (number === sum2 && number !== sum1) {
      // match
    }
    ```

    If there is a match, we then update both value setting a boolean flag to `true`. Else, we mark both values with the opposite values.


    ```js
    if (number === sum2 && number !== sum1) {
      numbers[number] = true;
      numbers[sum1] = true;
    } else {
      numbers[number] = false;
      numbers[sum1] = false;
    }
    ```

- once we managed to mark every item either `true` or `false`, we are left with a hefty array, filled with boolean values. The index of each item, conveniently enough, provides the actual number behind each flag. This means we can finally loop through the array, update the items with a `true` value, and finally filter out these numbers to identify the amicable pairs.

```js
return numbers.map((number, index) => (number ? index : null)).filter(number => number);
```

The code looks quite cumbersome, but once you grasp the different conditions and the idea of tagging the necessary values, it starts to make a whole lot of sense. Most importantly, however, it provides the desired value.

```js
amicableNumbers(2000); // [220, 284, 1184, 1210]
```

## Wrap Up

You can find the `amicableNumbers` function in the script bearing the same name. This is because, while providing the amicable numbers, the code does not solve the challenge. As with many problems before it, one last line of code is necessary, to add the amicable numbers together and complete the task of finding the sum of the selected few below the input `n`.

```js
return numbers
  .map((number, index) => (number ? index : null))
  .filter(number => number)
  .reduce((acc, curr) => acc + curr, 0);
```

---
