const factorial = n => {
  if (n <= 1) {
    return 1;
  }

  return n * factorial(n - 1);
};

function sumFactorialDigits(n) {
  const factor = factorial(n);
  return `${factor}`.split("").reduce((acc, curr) => acc + parseInt(curr, 10), 0);
}

console.log(sumFactorialDigits(5)); // 3