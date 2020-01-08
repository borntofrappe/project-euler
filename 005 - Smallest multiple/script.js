function smallestMult(n) {
  // function recursively providing the prime numbers making up the input x
  function primeFactors(x) {
    if (x <= 1) {
      return [];
    }
    for (let i = 2; i <= x; i += 1) {
      if (x % i === 0) {
        return [i, ...primeFactors(x / i)];
      }
    }
  }

  // array in which to describe the prime numbers and their frequency
  const primes = [];
  for (let i = n; i > 1; i -= 1) {
    // array with the prime values
    const factors = primeFactors(i);

    /* array describing the prime numbers and their absolute frequency
    [
      prime: frequency,
      prime: frequency,
      ...
    ]
    */

    const frequentPrimes = factors.reduce((acc, curr) => {
      // if the prime is already considered, increment the matching value
      const index = acc.findIndex(([prime]) => prime === curr);
      if (index !== -1) {
        acc[index][1] += 1;
      } else {
        acc.push([curr, 1]);
      }
      return acc;
    }, []);

    primes.push(...frequentPrimes);
  }

  /* array considering the prime numbers with greatest absolute frequency
    [
      prime: greatestFrequency,
      prime: greatestFrequency,
      ...
    ]
  */
  const mostFrequentPrimes = primes.reduce((acc, curr) => {
      // if the prime is already considered, keep the greater between the two values
    const index = acc.findIndex(([prime]) => prime === curr[0]);
    if(index !== -1) {
      acc[index][1] = Math.max(acc[index][1], curr[1]);
    } else {
      acc.push([curr[0], curr[1]]);
    }
    return acc;
  }, []);

  /* smallest multiple, as the product of the prime numbers and their absolute frequency
  */
  return mostFrequentPrimes.reduce((acc, curr) => {
    const [prime, frequency] = curr;
    return acc * Math.pow(prime, frequency);
  }, 1);
}

console.log(smallestMult(50));