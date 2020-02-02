function primes(n) {
  const numbers = Array(n - 2)
    .fill("")
    .map((val, index) => ({
      isPrime: true,
      number: index + 2
    }));

  for (let i = 2; i < Math.sqrt(n); i += 1) {
    if (numbers[i - 2].isPrime) {
      for (let j = i ** 2; j < n; j += i) {
        numbers[j - 2].isPrime = false;
      }
    }
  }
  return numbers.filter(({isPrime}) => isPrime).map(({number}) => number);
}

const thousandPrimes = primes(1000);
console.log(thousandPrimes);