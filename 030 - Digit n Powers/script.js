function maxDigits(n) {
  let digits = 1;
  while (10 ** digits - 1 < digits * 9 ** n) {
    digits += 1;
  }
  return digits;
}

function digitnPowers(n) {
  const lowerThreshold = 10;
  const upperThreshold = 10 ** maxDigits(n) - 1;
  const powers = Array(10)
    .fill(0)
    .map((value, index) => index ** n);

  let total = 0;

  for (let i = lowerThreshold; i < upperThreshold; i += 1) {
    const digits = i.toString().split("").map(num => parseInt(num, 10));
    const sum = digits.reduce((acc, curr) => acc + powers[curr], 0);

    if (i === sum) {
      total += i;
    }
  }

  return total;
}

console.log(digitnPowers(3));