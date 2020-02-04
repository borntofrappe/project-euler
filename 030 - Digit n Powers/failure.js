function digitnPowers(n) {
  const lowerThreshold = 10;
  const upperThreshold = n * 9 ** n;
  const numbers = [];
  for(let i = lowerThreshold; i < upperThreshold; i += 1) {
    const digits = `${i}`
      .split("")
      .map(num => parseInt(num, 10))
      .reduce((acc, curr) => acc + curr ** n, 0);
    if(i === digits) {
      numbers.push(i);
    }
  }
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(digitnPowers(3));