const factorial = n => {
  if(n <= 1) {
    return 1;
  }
  return n * factorial(n-1);
}

function lexicographicPermutations(n) {
  let digits = [0,1,2,3,4,5,6,7,8,9];
  const numbers = [];

  let index = n;

  for(let i = digits.length - 1; i >= 0; i -= 1) {
    const locks = factorial(i);
    const round = Math.floor(index / locks);
    numbers.push(digits[round]);
    digits = [...digits.slice(0, round), ...digits.slice(round + 1)];
    index -= locks * round;
  }

  return parseInt(numbers.join(""), 10);
}

lexicographicPermutations(999999);