function factorial(n) {
  if(n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
function latticePaths(gridSize) {
  return factorial(2 * gridSize) / (factorial(gridSize) * factorial(gridSize));
}

console.log(latticePaths(20));