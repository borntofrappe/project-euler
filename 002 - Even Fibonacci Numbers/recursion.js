function fiboEvenSum(n) {
  function fibonacciNumbers(n) {
    if(n <= 2) {
      return [1, 2];
    } else {
      const fib = fibonacciNumbers(n - 1);
      const [a, b] = fib.slice(-2);
      return [...fib, a + b];
    }
  }
  return fibonacciNumbers(n).reduce((acc, curr) => (curr % 2 === 0 ? acc + curr : acc), 0);
}

console.log(fiboEvenSum(10));

