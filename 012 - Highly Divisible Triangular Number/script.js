function countFactors(n) {
  let count = 0;
  for(let i = 1; i <= Math.sqrt(n); i+= 1) {
    if(n % i === 0) {
      count += 1;
      if(n / i !== i) {
        count += 1;
      }
    }
  }
  return count;
}

function divisibleTriangleNumber(n) {
  let counter = 2;
  while(countFactors(counter * (counter + 1) / 2) < n) {
    counter += 1;
  }
  return counter * (counter + 1) / 2;
}

divisibleTriangleNumber(10)
