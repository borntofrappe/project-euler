function distinctPowers(n) {
  const powers = [];
  for (let a = 2; a <= n; a += 1) {
    for (let b = 2; b <= n; b += 1) {
      powers.push(a ** b);
    }
  }
  return new Set(powers).size;
}

console.log(distinctPowers(30));
