// x / y in long division
const longDivision = (x, y) => {
  // use let since dividend and remainder need to be updated
  let dividend = x;
  let divisor = y;
  let remainder = dividend % divisor;

  // variable describing the repeating pattern, if existing
  let pattern;

  // array describing the different digits of the division
  // initialized with the integer division if there's already no remainder
  const quotient = remainder === 0 ? [dividend / divisor] : [];

  // continue until the remainder is equal to zero
  // ! be sure to add a condition to break out of the while loop as you find a repeating pattern
  while(remainder !== 0 && pattern === undefined) {
    // integer division
    let integerDivision = Math.floor(dividend / divisor);

    // add a decimal point if necessary and if not already included
    if(!quotient.includes(".") && integerDivision < 1) {
      quotient.push(".");
    }

    // multiply the divided by 10 until you get a positive integer division
    while(integerDivision < 1) {
      dividend *= 10;
      integerDivision = Math.floor(dividend / divisor);
    }

    // add the result of the integer division to the quotient array
    quotient.push(integerDivision);

    if(quotient.includes(".")) {
      // break if you find a repeating pattern
      const decimalPoint = quotient.findIndex(item => item === ".");
      // starting from the end of the decimal values, consider if the string repeats itself
      const decimalValues = quotient.slice(decimalPoint + 1).reverse();
      for(let i = 1; i <= Math.floor(decimalValues.length / 2); i += 1) {
        if(decimalValues.slice(0, i).join("") === decimalValues.slice(i, i * 2).join("")) {
          pattern = decimalValues.slice(0, i);

          quotient.pop();
        }
      }
    }

    // update the remainder and dividend
    remainder = dividend % divisor;
    dividend = remainder;
  }
  return parseFloat(quotient.join(""));
};


for(let i = 2; i < 10; i += 1) {
  console.log(`1/${i} = ${longDivision(1, i)}`);
}