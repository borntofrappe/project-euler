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

  // array of primes
  const primes = [];
  for (let i = n; i > 1; i -= 1) {
    primes.push(...primeFactors(i));
  }

  // multidimensional array describing the frequency of the consecutive primes
  const primesFrequency = primes.reduce((acc, curr) => {
    // use the length of the array to consider the last item
    const { length } = acc;
    // if the last item describes the same prime, increment its counter
    if (length > 0 && acc[length - 1][0] === curr) {
      acc[length - 1][1] += 1;
      // else add a new array describing the prime
    } else {
      acc.push([curr, 1]);
    }
    return acc;
  }, []);

  // multidimensional array describing the consecutive primes with greatest frequency
  const primesGreatestFrequency = primesFrequency.reduce((acc, curr) => {
    // index of the prime in the acc array
    const index = acc.findIndex(([prime]) => prime === curr[0]);
    if (index !== -1) {
      // update the frequency of the prime to keep the greater between the two
      acc[index][1] = Math.max(acc[index][1], curr[1]);
    } else {
      // add the prime number with
      acc.push([curr[0], curr[1]]);
    }
    return acc;
  }, []);

  return primesGreatestFrequency.reduce((acc, curr) => acc * Math.pow(curr[0], curr[1]), 1);
}
console.log(smallestMult(50));