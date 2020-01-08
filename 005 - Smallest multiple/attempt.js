function smallestMult(n) {
  const primes = [];
  for(let i = 2; i <= n; i += 1) {
    const isMultiple = primes.find(prime => i % prime === 0);
    if(!isMultiple) {
      primes.push(i);
    }
  }

  const uniqueFactors = [];
  for(let i = n; i > Math.floor(n / 2); i-= 1) {
    const isFactor = uniqueFactors.find(factor => factor % i === 0);
    if(!isFactor) {
      uniqueFactors.push(i);
    }
  }

  const primesProduct = primes.reduce((acc, curr) => acc * curr, 1);
  let solution = primesProduct;
  while(!uniqueFactors.every(factor => solution % factor === 0)) {
    solution += primesProduct;
  }
  return solution;
}

console.log(smallestMult(40));