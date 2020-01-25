const digits = number => `${number}`.split("").map(num => parseInt(num, 10));

const multiplication = (multiplicand, multiplier) => {
  let product = [];
  let indexRow = 0;
  for (let i = multiplier.length - 1; i >= 0; i -= 1) {
    let indexColumn = 0;
    for (let j = multiplicand.length - 1; j >= 0; j -= 1) {
      const digit = multiplier[i] * multiplicand[j];

      if(product[indexRow + indexColumn] !== undefined) {
        product[indexRow + indexColumn] += digit;
      } else {
        product[indexRow + indexColumn] = digit;
      }
      indexColumn += 1;
    }
    indexRow += 1;
  }

  for(let i = 0; i < product.length; i += 1) {
    if(product[i] >= 10) {
      const tens = Math.floor(product[i] / 10);
      product[i] -= tens * 10;
      if(product[i + 1]) {
        product[i + 1] += tens;
      } else {
        product[i + 1] = tens;
      }
    }
  }
  return product.reverse();
};


function sumFactorialDigits(n) {
  let product = digits(n);
  for(let i = n - 1; i > 1; i -= 1) {
    product = multiplication(product, digits(i));
  }
  return product.reduce((acc, curr) => acc + curr, 0);
}

sumFactorialDigits(100);