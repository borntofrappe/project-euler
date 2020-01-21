function powerDigitSum(exponent) {
  const digits = [2];
  for(let i = 1; i < exponent; i+= 1) {
    const { length } = digits;
    for(let j = length - 1; j >= 0; j -= 1) {
      digits[j] *= 2;
      if(digits[j] >= 10) {
        digits[j] -= 10;
        if(j === length - 1) {
          digits.push(1);
        } else {
          digits[j+1] += 1;
        }
      }
    }
  }
  return digits.reduce((acc, curr) => acc + curr, 0);
}

console.log(powerDigitSum(1000));