function specialPythagoreanTriplet(n) {
  let sumOfabc = n;
  for (let a = 1; a < (n - 3) / 3; a += 1) {
    for (let b = a; b < 2 * (n - 3) / 3; b += 1) {
      const c = sumOfabc - a - b;
      if (c ** 2 === a ** 2 + b ** 2) {
        return a * b * c;
      }
    }
   }
  return `Unable to find a special Pythagorean triplet for n equal to ${n}`;
}


console.log(specialPythagoreanTriplet(1000));
