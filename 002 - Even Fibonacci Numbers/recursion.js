function fiboEvenSum(n) {
  // function creating fibonacci's sequence
  function fibonacciNumbers(n) {
    // starting values in the base case
    if(n <= 2) {
      return [1, 2];
    } else {
      // call the function recursively, and for a smaller number
      const fib = fibonacciNumbers(n - 1);
      // include the sum of the last two numbers following the previous value
      const [a, b] = fib.slice(-2);
      return [...fib, a + b];
    }
  }
  // add the even numbers from fibonacci's sequence
  return fibonacciNumbers(n).reduce((acc, curr) => (curr % 2 === 0 ? acc + curr : acc), 0);
}

console.log(fiboEvenSum(10));

