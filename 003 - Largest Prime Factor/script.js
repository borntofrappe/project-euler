function largestPrimeFactor(number) {
  // array of primes
  const primes = [];
  // from 2 up to the input number (excluded)
  for (let i = 2; i < number; i += 1) {
    // identify if i is a prime number
    const prime = primes.find(prime => i % prime === 0);
    if (!prime) {
      primes.push(i);
      // identify if i is also a factor for the input number
      if (number % i === 0) {
        // call the function with the result of the division
        return largestPrimeFactor(number / i);
      }
    }
  }
  // the for loop doesn't find a prime factor, then the number is the last, and largest prime number
  return number;
}

console.log(largestPrimeFactor(600851475143));