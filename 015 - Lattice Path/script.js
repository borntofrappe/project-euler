function factorial(n, threshold = 1) {
  if(n <= threshold) {
    return 1;
  }
  return n * factorial(n - 1, threshold);
}
function latticePaths(gridSize) {
  return factorial(2 * gridSize, gridSize) / factorial(gridSize);
}

console.log(latticePaths(20));