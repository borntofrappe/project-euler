function spiralDiagonals(n) {
  let solution = 1;

  let counter = 1;
  let increment = 2;

  while(counter < n ** 2) {
    for(let i = 0; i < 4; i += 1) {
      counter += increment;
      solution += counter;
    }
    increment += 2;
  }

  return solution;
}

console.log(spiralDiagonals(1001));
