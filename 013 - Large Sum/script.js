function largeSum(arr) {
  const total = arr
    .map(val => parseInt(val))
    .reduce((acc, curr) => acc + curr, 0);

  return total
    .toString()
    .replace('.', '')
    .slice(0, 10);
}

const testNums = [
  '37107287533902102798797998220837590246510135740250',
  '46376937677490009712648124896970078050417018260538',
];

console.log(largeSum(testNums));
