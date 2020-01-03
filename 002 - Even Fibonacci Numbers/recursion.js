function fiboEvenSum(n) {
  // function creating fibonacci's sequence
  function fibonacciNumbers(n) {
    // starting values in the base case
    if(n <= 2) {
      return [1, 2];
    } else {
      // call the function recursively, and for a smaller number
      const sequence = fibonacciNumbers(n - 1);
      // include the sum of the last two numbers following the previous value
      const [a, b] = sequence.slice(-2);
      return [...sequence, a + b];
    }
  }
  // add the even numbers from fibonacci's sequence
  const sequence = fibonacciNumbers(n);
  return sequence.reduce((acc, curr) => (curr % 2 === 0 ? acc + curr : acc), 0);
}

console.log(fiboEvenSum(10));

