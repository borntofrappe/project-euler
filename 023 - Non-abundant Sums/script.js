function properDivisors(num) {
  const divisors = [];

  for (let i = 1; i <= Math.sqrt(num); i += 1) {
    if (num % i === 0) {
      divisors.push(i);

      const j = num / i;
      if (j !== i && j !== num) {
        divisors.push(j);
      }
    }
  }

  return divisors.sort((a, b) => a - b);
}

function isAbundant(n) {
  const divisors = properDivisors(n);
  const sum = divisors.reduce((acc, curr) => acc + curr, 0);
  return sum > n;
}

function sumOfNonAbundantNumbers(n) {
  const numbers = Array(n).fill('').map((val, index) => ({
    value: index,
    canBeSummed: false,
  }));
  const abundantNumbers = [];
  for(let i = 0; i < n; i += 1) {
    if(isAbundant(i)) {
      abundantNumbers.push(i);
      for(let j = 0; j < abundantNumbers.length; j += 1) {
        const index = abundantNumbers[j] + i;
        if(index < n && !numbers[index].canBeSummed) {
          numbers[index].canBeSummed = true;
        }
        if(index >= n) {
          break;
        }
      }
    }
  }
  return numbers.filter(({canBeSummed}) => !canBeSummed).reduce((acc, curr) => acc + curr.value, 0);
}

console.log(sumOfNonAbundantNumbers(28123));