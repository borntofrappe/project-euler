function primeSummation(n) {
  // function recursively calling itself to create an array of prime numbers
  function primes(n) {
    // base case, return empty array
    if (n < 2) {
      return [];
    }
    // recursive call, return the array for the previous values
    // ! include the current value for n if this is prime itself
    const previousPrimes = primes(n - 1);
    const isNotPrime = previousPrimes.find(prime => n % prime === 0);
    return isNotPrime ? [...previousPrimes] : [n, ...previousPrimes];
  }

  // return the sum of the prime numbers
  // ! n non inclusive
  return primes(n - 1).reduce((acc, curr) => acc + curr, 0);
}

console.log(primeSummation(2001)); // 41