function factorsNumber(n) {
  const factors = [];
  for (let i = 1; i <= n; i += 1) {
    if (n % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

function triangularNumber(n) {
  if (n <= 1) {
    return 1;
  }
  return n + triangularNumber(n - 1);
}

function divisibleTriangleNumber(n) {
  let number = 0;
  let counter = 0;
  let numberFactors = 0;
  while(numberFactors < n) {
    counter += 1;
    number = triangularNumber(counter);
    numberFactors =factorsNumber(number).length;
  }

  return number;
}