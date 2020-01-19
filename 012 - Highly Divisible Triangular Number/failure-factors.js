function divisibleTriangleNumber(n) {
  let counter = 0;
  let triangularNumber = 0;
  let numberFactors = 0;
  while(numberFactors < n) {
    counter += 1;
    triangularNumber = counter * (counter + 1) / 2;

    const factors = [];
    for (let i = 1; i <= triangularNumber; i += 1) {
      if (triangularNumber % i === 0) {
        factors.push(i);
      }
    }
    numberFactors = factors.length;
  }

  return triangularNumber;
}

console.log(divisibleTriangleNumber(10)); // 120
