// works, but it's highly inefficient
function primeSummation(n) {
  const primes = [];
  for (let i = 2; i < n; i += 1) {
    if(!primes.find(prime => i % prime === 0)) {
      primes.push(i);
    }
  }
  return primes.reduce((acc, curr) => acc + curr, 0);
}
console.log(primeSummation(17));
