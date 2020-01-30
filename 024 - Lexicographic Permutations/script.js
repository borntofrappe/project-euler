const factorial = n => {
  if(n <= 1) {
    return 1;
  }
  return n * factorial(n-1);
}

function lexicographicPermutations(n) {
  let digits = [0,1,2,3,4,5,6,7,8,9];

  const numbers = [];
  let excess = n;

  for(let i = digits.length - 1; i >= 0; i -= 1) {
    const factor = factorial(i);
    const index = Math.floor(excess / factor);
    numbers.push(digits[index]);
    digits = [...digits.slice(0, index), ...digits.slice(index + 1)];
    excess -= factor * index;
  }

  return parseInt(numbers.join(""), 10);
}

lexicographicPermutations(999999);