const divisionPattern = (d) => {
  const sequence = [{
    dividend: 1,
    divisor: d,
    quotient: `${Math.floor(1 / d)}`,
    remainder: 1 % d,
  }];

  let pattern;

  while(sequence[sequence.length - 1].remainder !== 0 && pattern === undefined) {
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

    const index = sequence.findIndex(element => element.dividend === remainder && element.remainder === remainder);
    if(index !== -1) {
      const decimal = quotient.split("").findIndex(value => value === '.');
      pattern = quotient.slice(decimal + index + 1);
    }

    sequence.push({
      dividend: remainder,
      divisor,
      quotient: quotient + integerDivision,
      remainder,
    });
  }

  return pattern ? pattern : null;
};


function reciprocalCycles(n) {
  const cycle = {
    d: 0,
    pattern: '',
  }
  for(let i = 2; i < n; i += 1) {
    const pattern = divisionPattern(i);
    if(pattern && pattern.length > cycle.pattern.length) {
      cycle.d = i;
      cycle.pattern = pattern;
    }
  }
  return cycle.d;
}

console.log(reciprocalCycles(1000)); // 983