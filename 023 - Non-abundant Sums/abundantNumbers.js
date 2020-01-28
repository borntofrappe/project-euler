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

function abundantNumbers(n) {
  const numbers = [];
  for (let i = 0; i < n; i += 1) {
    if (isAbundant(i)) {
      numbers.push(i);
    }
  }
  return numbers;
}

console.log(abundantNumbers(100)); // [12, 18, 20, 24, 30, 36, 40, 42, 48, 54, 56, 60, 66, 70, 72, 78, 80, 84, 88, 90, 96]