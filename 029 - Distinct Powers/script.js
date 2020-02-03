function distinctPowers(n) {
  const powers = [];
  for (let a = 2; a <= n; a += 1) {
    for (let b = 2; b <= n; b += 1) {
      const power = a ** b;
      if(!powers.includes(power)) {
        powers.push(power);
      }
    }
  }
  return powers.length;
}

console.log(distinctPowers(30));
