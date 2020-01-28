# [Non-abundant Sums](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-23-non-abundant-sums)

## Problem

> A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.
>
> A number `n` is called deficient if the sum of its proper divisors is less than `n` and it is called abundant if this sum exceeds `n`.
>
> As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.
>
> Find the sum of all positive integers `<= n` which cannot be written as the sum of two abundant numbers.

## Setup

```js
function sumOfNonAbundantNumbers(n) {
  // Good luck!
  return n;
}

sumOfNonAbundantNumbers(28123);
```

## Notes

The description is complex enough to warrant a bit of exploration, so let's start looking at abundant/deficient/perfect numbers.

### checkAbundance

In order to establish the "abundance", if we can so label it, of a number, we need to retrieve the proper divisors for said number. Luckily for us, we developed a `properDivisors` function in problem #21 which is slightly more efficient than iterating from `1` up to the given number.

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

  return divisors.sort((a, b) => a - b);
}
```

I won't repeat myself here, but the idea is to find proper divisors in pairs: as soon as you find one, you can divide the input number by the divisor and find a new one.

With this function, we can check whether a number is abundant, or for that matter whether it is deficient or perfect, summing up the proper divisors.

```js
function checkAbundance(n) {
  const divisors = properDivisors(n);
  const sum = divisors.reduce((acc, curr) => acc + curr, 0);
}
```

Following the given instructions:

|           | Label     |
| --------- | --------- |
| sum === n | perfect   |
| sum < n   | deficient |
| sum > n   | abundant  |

We can determine the label for the number with a series of if/else if statements.

```js
function checkAbundance(n) {
  const divisors = properDivisors(n);
  const sum = divisors.reduce((acc, curr) => acc + curr, 0);
  if (sum === n) {
    return "Perfect";
  } else if (sum < n) {
    return "Deficient";
  }
  return "Abundant";
}
```

Ultimately, we'll only care if the number is abundant or not, but to attest a series of values, I decided to label each and every case.

```js
checkAbundance(6); // perfect, 1 + 2 + 3 === 6
checkAbundance(8); // deficient 1 + 2 + 4 < 8
checkAbundance(12); // abundant 1 + 2 + 3 + 4 + 6 > 12
```

In the `checkAbundance.js` script you find the code, with a for loop log the abundance of the first twenty numbers in the console.

### abundantNumbers

To find the values which _cannot be written as the sum of two abundant numbers_, it seems natural to look for abundant numbers first. I am still unsure as to how to go about finding the sum of these values, but one step at a time.

Modifying the existing code, we can return a boolean depending on whether the sum is greater than the input value, without worrying any more about perfect or deficient numbers.

```js
function isAbundant(n) {
  const divisors = properDivisors(n);
  const sum = divisors.reduce((acc, curr) => acc + curr, 0);
  return sum > n;
}
```

To then find the abundant numbers below a certain threshold, we can then use the function in a for loop.

```js
function abundantNumbers(n) {
  const numbers = [];
  for (let i = 0; i < n; i += 1) {
    if (isAbundant(i)) {
      numbers.push(i);
    }
  }
  return numbers;
}
```

Again, not the answer to our current challenge, but we are inching toward the solution. You can find the code in `abundantNumbers.js`.

### sumOfNonAbundantNumbers

Looking at the array of abundant numbers and thinking about past solutions, I was once again reminded of the _Sieve of Eratosthenes_.

Here's the idea:

- create an array in which to specify every number up to `n`

  ```js
  function sumOfNonAbundantNumbers(n) {
    const numbers = Array(n)
      .fill("")
      .map((val, index) => ({
        value: index,
        canBeSummed: false
      }));
  }
  ```

  Each item is initialized with an object describing the individual value and a boolean. By default, it is set to `false`, with the idea to switch it to `true` in the moment the number can be represented by the sum of two abundant numbers

- similarly to the previous section, loop from `1` up to `n` and consider if the current value is abundant. Exactly like in the previous section, push the value in an array if that is the case.

  ```js
  function sumOfNonAbundantNumbers(n) {
    const numbers = Array(n)
      .fill("")
      .map((val, index) => ({
        value: index,
        canBeSummed: false
      }));

    const abundantNumbers = [];

    for (let i = 0; i < n; i += 1) {
      if (isAbundant(i)) {
        abundantNumbers.push(i);
      }
    }
  }
  ```

- here's the kicker: within the `if` statement, set up a for loop to iterate through the `abundantNumbers` array

  ```js
  if (isAbundant(i)) {
    abundantNumbers.push(i);
    for (let j = 0; j < abundantNumbers.length; j += 1) {}
  }
  ```

  Why are we looping through the array? The idea is to add the current abundant value and each abundant value coming before it together.

  ```js
  if (isAbundant(i)) {
    abundantNumbers.push(i);
    for (let j = 0; j < abundantNumbers.length; j += 1) {
      const index = abundantNumbers[j] + i;
    }
  }
  ```

  The result of this addition is a number which can be represented as the sum of two abundant values. If this value exist in the array, we can then toggle the boolean to true.

  ```js
  if (isAbundant(i)) {
    abundantNumbers.push(i);
    for (let j = 0; j < abundantNumbers.length; j += 1) {
      const index = abundantNumbers[j] + i;
      if (index < n) {
        numbers[index].canBeSummed = true;
      }
    }
  }
  ```

This is theoretically enough to "mark" the numbers which can be summed with the `true` boolean. The body of the for loop can be improved however. For starters, we can toggle the boolean to `true` only if it was `false` in the first place. A number can indeed be represented by the sum of multiple abundant numbers.

```js
for (let j = 0; j < abundantNumbers.length; j += 1) {
  const index = abundantNumbers[j] + i;
  if (index < n && !numbers[index].canBeSummed) {
    numbers[index].canBeSummed = true;
  }
}
```

Then, if the index comes to exceed the boundaries of the array, we can break out of the for loop to consider the following abundant number.

```js
for (let j = 0; j < abundantNumbers.length; j += 1) {
  const index = abundantNumbers[j] + i;
  if (index < n && !numbers[index].canBeSummed) {
    numbers[index].canBeSummed = true;
  }

  if (index >= n) {
    break;
  }
}
```

### Wrap Up

Past the nested for loops, we have an array describing the numbers up to `n`, where each integer that can be represented as the sum of two abundant numbers has been updated with an appropriate flag.

To return the sum of the opposite set, of the values which cannot be represented, we can filter for the necessary numbers

```js
return numbers.filter(({ canBeSummed }) => !canBeSummed);
```

And add their values together with a `reduce` function

```js
return numbers.filter(({ canBeSummed }) => !canBeSummed).reduce((acc, curr) => acc + curr.value, 0);
```

---

I am positive the solution can be improved, but the code described so far, and present in `script.js`, does work. If you know of a better way, I'm just a tweet...near, [@borntofrappe](https://twitter.com/borntofrappe).
