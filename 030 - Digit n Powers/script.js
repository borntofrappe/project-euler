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

function nextDigit(n) {

}
function digitnPowers(n) {
  const lowerThreshold = 10;
  const upperThreshold = 10 ** (maxDigits(n) -1);
  const powers = Array(10).fill(0).map((value, index) => index ** n);
  let solution = 0;
  for(let i = lowerThreshold; i < upperThreshold; i += 1) {
    let number = i;
    let sum = 0;
    const digits = i.toString().split();
    while(number > 0) {
      const digit = number % 10;
      digits.push(digit);
      sum += powers[digits];
      if(sum > i) {
        // update i to go up a digit
        i = nextDigit(i);
        break;
      }
      number = parseInt(number / 10);
    }
    if(sum === i) {
      solution += sum;
    }
  }

  return solution;
}

digitnPowers(5);
