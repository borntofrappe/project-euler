// x / y in long division
const longDivision = (x, y) => {
  const sequence = [{
    dividend: x,
    divisor: y,
    quotient: `${Math.floor(x / y)}`,
    remainder: x % y,
  }];

  let pattern;

  while(sequence[sequence.length - 1].remainder !== 0 && pattern === undefined) {
    let { dividend, divisor, quotient } = sequence[sequence.length - 1];

    let integerDivision = Math.floor(dividend / divisor);

    // add a decimal point if necessary and if not already included
    if(!quotient.includes(".") && integerDivision < 1) {
      quotient += '.';
    }

    // multiply the divided by 10 until you get a positive integer division
    while(integerDivision < 1) {
      dividend *= 10;
      integerDivision = Math.floor(dividend / divisor);
    }

    const remainder = dividend % divisor;

    const index = sequence.findIndex(element => element.dividend === remainder && element.remainder === remainder);
    if(index !== -1) {
      const decimal = quotient.split("").findIndex(value => value === '.');
      console.log(decimal + index);
      pattern = quotient.slice(decimal + index + 1);
    }

    sequence.push({
      dividend: remainder,
      divisor,
      quotient: quotient + integerDivision,
      remainder,
    });

  }
  return {
    sequence,
    pattern
  };
};

longDivision(1, 7);

