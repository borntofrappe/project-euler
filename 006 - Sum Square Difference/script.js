function sumSquareDifference(n) {
  if (n === 1) {
    return 0;
  } else {
    return n ** 2 * (n - 1) + sumSquareDifference(n-1);
  }
}

console.log(sumSquareDifference(80));
