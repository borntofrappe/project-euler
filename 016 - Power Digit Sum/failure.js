function powerDigitSum(exponent) {
  const result = 2**exponent;
  return result.toString().split("").reduce((acc, curr)=> (acc + parseInt(curr, 10)) ,0);
}

console.log(powerDigitSum(15));
