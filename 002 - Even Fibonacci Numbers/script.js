function fiboEvenSum(n) {
  // starting values
  const sequence = [1, 2];
  // until the array has n items
  for (let i = sequence.length; i < n; i += 1) {
    // retrieve the last two items and append their sum to the array
    const [a, b] = sequence.slice(-2);
    sequence.push(a + b);
  }
  // return the sum of only the even numbers
  return sequence.reduce((acc, curr) => (curr % 2 === 0 ? acc + curr : acc), 0);
}

console.log(fiboEvenSum(10));