function smallestMult(n) {
  const uniqueFactors = [];
  for(let i = n; i > 1; i-= 1) {
    const isFactor = uniqueFactors.find(factor => factor % i === 0);
    if(!isFactor) {
      uniqueFactors.push(i);
    }
  }

  let value = n;
  while(!uniqueFactors.every(factor => value % factor === 0)) {
    value += n;
  }
  return value;
}

console.log(smallestMult(20));