function primes(n) {
  const numbers = Array(n - 2)
    .fill("")
    .map((num, index) => ({
      isPrime: true,
      number: index + 2
    }));

  for (let i = 2; i < Math.sqrt(n); i += 1) {
    if (numbers[i - 2].isPrime) {
      for (let j = i ** 2; j < n; j += i) {
        numbers[j - 2].isPrime = false;
      }
    }
  }
  return numbers.filter(({isPrime}) => isPrime).map(({number}) => number);
}


function quadraticPrimes(range) {
  const primesRange = primes(range);
  const primesRangeTwo = primes(range * 2);
  let solution = {
    n: 0,
    a: 0,
    b: 0,
  };

  for(let i = 0; i < primesRange.length; i += 1) {
    const b = primesRange[i];
    for(let a = range * -1 + 1; a < range; a += 1) {
      let n  = 0;
      while(primesRangeTwo.includes(n ** 2 + a * n + b)) {
        n += 1;
      }
      if(n > solution.n) {
        solution.n = n;
        solution.a = a;
        solution.b = b;
      }
    }
  }

  return solution.a * solution.b;
}

quadraticPrimes(200);