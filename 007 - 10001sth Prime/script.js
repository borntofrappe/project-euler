function nthPrime(n) {
  const primes = [];
  let candidate = 1;
  while(primes.length < n) {
    candidate += 1;
    if(!primes.find(prime => candidate % prime === 0)) {
      primes.push(candidate);
    }
  }
  return primes[n - 1];
}

console.log(nthPrime(10001));
