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
      if (acc[curr]) {
        acc[curr] += 1;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

    primes.push(factors);
  }

  // object considering the prime numbers with greatest absolute frequency
  const mostFrequentPrimes = primes.reduce((acc, curr) => {
    const [prime, counter] = Object.entries(curr)[0];
    if (acc[prime]) {
      const value = Math.max(acc[prime], counter);
      acc[prime] = value;
    } else {
      acc[prime] = counter;
    }
    return acc;
  }, {});

  // smallest multiple
  return Object.entries(mostFrequentPrimes).reduce((acc, [prime, counter]) => {
    return acc * prime * counter;
  }, 1);
}

smallestMult(7);