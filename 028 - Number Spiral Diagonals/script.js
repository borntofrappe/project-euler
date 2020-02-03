function spiralDiagonals(n) {
  let increment = 2;
  let counter = 1;
  let solution = 1;
  while(counter <= n ** 2) {
    for(let i = 0; i < 4; i += 1) {
      counter += increment;
      if(counter > n ** 2) {
        break;
      }
      solution += counter;
    }
    increment += 2;
  }
  return solution;
}

console.log(spiralDiagonals(5));
