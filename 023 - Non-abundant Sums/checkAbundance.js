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


function checkAbundance(n) {
  const divisors = properDivisors(n);
  const sum = divisors.reduce((acc, curr) => acc + curr, 0);
  if (sum === n) {
    return "Perfect";
  } else if (sum < n) {
    return "Deficient";
  }
  return "Abundant";
}


for(let n = 0; n < 20; n += 1) {
  console.log(`${n} is a ${checkAbundance(n).toLowerCase()} number`);
}