function largestPrimeFactor(number) {
  // array of primes
  const primes = [];
  // from 2 up to and including the input number
  for (let i = 2; i <= number; i += 1) {
    const prime = primes.find(prime => i % prime === 0);
    if (!prime) {
      primes.push(i);
      // if the prime number is also a factor for the input number exit the loop
      if (number !== i && number % i === 0) {
        // call the function with the result of the division
        return largestPrimeFactor(number / i);
      }
    }
  }
  // the for loop doesn't find a prime factor, then number is the solution
  return number;
}

// proudly
console.log(largestPrimeFactor(600851475143));