const longDivision = (x, y) => {
  const sequence = [{
    dividend: x,
    divisor: y,
    quotient: `${Math.floor(x / y)}`,
    remainder: x % y,
  }];

  let pattern;

  while(sequence[sequence.length - 1].remainder !== 0 && !pattern) {
    let { dividend, divisor, quotient } = sequence[sequence.length - 1];

    let integerDivision = Math.floor(dividend / divisor);

    if(!quotient.includes(".") && integerDivision < 1) {
      quotient += '.';
    }

    while(integerDivision < 1) {
      dividend *= 10;
      integerDivision = Math.floor(dividend / divisor);
    }

    const remainder = dividend % divisor;
    quotient += integerDivision;

    const index = sequence.findIndex(element => element.dividend === remainder && element.remainder === remainder);
    if(index !== -1) {
      const decimal = quotient.split("").findIndex(value => value === '.');
      pattern = quotient.slice(decimal + index + 1);
    }

    sequence.push({
      dividend: remainder,
      divisor,
      quotient,
      remainder,
    });

  }
  return sequence[sequence.length - 1].quotient;
};

longDivision(1, 7); // "0.142857"

