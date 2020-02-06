function maxDigits(n) {
  let digits = 1;
  while(true) {
    if(10 ** (digits - 1) > digits * 9 ** n) {
      break;
    }
    digits += 1;
  }
  return digits;
}

function nextDigit(digits, j) {
  for(let i = digits.length - 1; i >= 0; i -= 1) {
    if(i > j) {
      digits[i] = 0;
    } else {
      if(i === j) {
        digits[i] += 1;
      }
      if(i > 0 && digits[i] > 9) {
        digits[i] = 0;
        digits[i - 1] += 1;
      }
    }
  }
  return parseInt(digits.join(""), 10);
}

function digitnPowers(n) {
  const lowerThreshold = 10;
  const upperThreshold = 10 ** (maxDigits(n) -1);
  const powers = Array(10).fill(0).map((value, index) => index ** n);
  let solution = 0;
  for(let i = lowerThreshold; i < upperThreshold; i += 1) {
    const number = i;
    let sum = 0;
    const digits = number.toString().split("").map(n => parseInt(n, 10));
    for(let j = 0; j < digits.length; j += 1) {
      sum += powers[digits[j]];

      if(sum > number) {
        i = nextDigit(digits, Math.max(0, j - 1)) - 1;
        break;
      }
    }
    if(sum === number) {
      solution += number;
    }
  }

  return solution;
}

console.log(digitnPowers(5));
