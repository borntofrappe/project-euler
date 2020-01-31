function digitFibonacci(n) {
  const digits = [1, 1];
  while(digits[digits.length - 1] < 10 ** (n - 1)) {
    const [a, b] = digits.slice(-2);
    digits.push(a + b)
  }
  return digits.length;
}

digitFibonacci(3);
