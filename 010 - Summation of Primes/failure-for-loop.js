function primeSummation(n) {
  // build an array of primes as those values i which cannot be divided by a prime themselves
  const primes = [];
  for (let i = 2; i < n; i += 1) {
    if(!primes.find(prime => i % prime === 0)) {
      primes.push(i);
    }
  }
  // return the sum of every prime value
  return primes.reduce((acc, curr) => acc + curr, 0);
}
console.log(primeSummation(2001));
