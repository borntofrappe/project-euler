function specialPythagoreanTriplet(n) {
  let sumOfabc = n;
  for(let a = 1; a < n - 2; a += 1) {
    for(let b = a+1; b < n -1; b+= 1) {
      c = sumOfabc - a - b;
      if(c ** 2 === a ** 2 + b ** 2) {
        return a * b * c;
      }
    }
  }
  return `Unable to find a special Pythagorean triplet for n equal to ${n}`;
 }

console.log(specialPythagoreanTriplet(1000));
