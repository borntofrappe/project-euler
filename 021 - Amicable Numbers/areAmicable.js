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

function areAmicable(num1, num2) {
  const sum1 = properDivisors(num1).reduce((acc, curr) => acc + curr, 0);
  if(sum1 !== num2) {
    return false;
  }
  const sum2 = properDivisors(num2).reduce((acc, curr) => acc + curr, 0);
  if(sum2 !== num1) {
    return false;
  }
  return true;
}

areAmicable(220, 284);
areAmicable(205, 125);
areAmicable(1184, 1210);
