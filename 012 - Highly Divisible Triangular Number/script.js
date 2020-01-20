function divisibleTriangleNumber(n) {
  let counter = 0;
  let triangularNumber = 0;
  let numberFactors = 0;

  while(numberFactors < n) {
    numberFactors = 0;
    counter += 1;
    triangularNumber = counter * (counter + 1) / 2;

    for(let i = 1; i < Math.sqrt(triangularNumber); i += 1) {
      if(triangularNumber % i === 0) {
        numberFactors += 1;
        if(triangularNumber / i !== i) {
          numberFactors += 1;
        }
      }
    }
  }
  return triangularNumber;
}

console.log(divisibleTriangleNumber(500)) // 76576500
