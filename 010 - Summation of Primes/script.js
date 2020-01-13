function primeSummation(n) {
  // array describing the input values from 2 to n
  const numbers = Array(n - 2)
    .fill("")
    .map((val, index) => ({
      isPrime: true,
      number: index + 2
    }));

  // consider numbers which have a known multiple in the array
  for (let i = 2; i < Math.sqrt(n); i += 1) {
    // if the number is prime, toggle the multiples to false
    if (numbers[i - 2].isPrime) {
      for (let j = i ** 2; j < n; j += i) {
        numbers[j - 2].isPrime = false;
      }
    }
  }

  // return the sum the prime numbers only
  return numbers.reduce((acc, { isPrime, number }) => (isPrime ? acc + number : acc), 0);
}

console.log(primeSummation(2000000));
