// Sieve of Eratosthenes
function primeSummation(n) {
  const values = Array(n - 2).fill('').map((val, index) => ({
    isPrime: true,
    value: index + 2,
  }));

  for(let i = 2; i < Math.sqrt(n); i+= 1) {
    if(values[i - 2].isPrime) {
      for(let j = i ** 2; j < n ; j += i) {
        values[j - 2].isPrime = false;
      }
    }
  }
  return values.filter(({isPrime}) => isPrime).reduce((acc, { value }) => acc + value, 0);
}

console.log(primeSummation(2000000));
