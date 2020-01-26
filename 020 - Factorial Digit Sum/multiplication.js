const digits = number => `${number}`.split("").map(num => parseInt(num, 10));

const multiplication = (multiplicand, multiplier) => {
  const digitsMultiplicand = digits(multiplicand);
  const digitsMultiplier = digits(multiplier);

  let digitsProduct = [];
  let indexRow = 0;

  for (let i = digitsMultiplier.length - 1; i >= 0; i -= 1) {
    let indexColumn = 0;
    for (let j = digitsMultiplicand.length - 1; j >= 0; j -= 1) {
      const digit = digitsMultiplier[i] * digitsMultiplicand[j];
      const index = indexRow + indexColumn;

      if(digitsProduct[index] !== undefined) {
        digitsProduct[index] += digit;
      } else {
        digitsProduct[index] = digit;
      }
      indexColumn += 1;
    }
    indexRow += 1;
  }

  for(let i = 0; i < digitsProduct.length; i += 1) {
    if(digitsProduct[i] >= 10) {
      const tens = Math.floor(digitsProduct[i] / 10);
      digitsProduct[i] -= tens * 10;
      if(digitsProduct[i + 1]) {
        digitsProduct[i + 1] += tens;
      } else {
        digitsProduct[i + 1] = tens;
      }
    }
  }
  return digitsProduct.reverse();
};


multiplication(25, 24);