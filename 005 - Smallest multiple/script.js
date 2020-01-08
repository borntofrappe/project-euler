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

  // array of objects describing the prime numbers and their absolute frequency
  const primes = [];
  for (let i = n; i > 1; i -= 1) {
    const factors = primeFactors(i).reduce((acc, curr) => {
      // if the key exist, increment the counter
      if (acc[curr]) {
        acc[curr] += 1;
      } else {
        // set up the key
        acc[curr] = 1;
      }
      return acc;
    }, {});

    primes.push(factors);
  }

  // object considering the prime numbers with greatest absolute frequency
  const mostFrequentPrimes = primes.reduce((acc, curr) => {
    const entries = Object.entries(curr);
    entries.forEach(([prime, frequency]) => {
      // if the key exist, consider the greater value between the current and previous frequency
      if (acc[prime]) {
        acc[prime] = frequency > acc[prime] ? frequency : acc[prime];
      } else {
        acc[prime] = frequency;
      }
    } );
    return acc;
  }, {});

  // smallest multiple, as the product of the prime numbers and their absolute frequency
  return Object.entries(mostFrequentPrimes).reduce((acc, curr) => {
    const [prime, frequency] = curr;
    return acc * Math.pow(prime, frequency);
  }, 1);
}

console.log(smallestMult(50));