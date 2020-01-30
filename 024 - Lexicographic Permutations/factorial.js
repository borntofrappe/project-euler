const factorial = n => {
  if(n <= 1) {
    return 1;
  }
  return n * factorial(n-1);
}


function lexicographicPermutations(n) {
  let numbers = [0,1,2,3,4,5,6,7,8,9];
  let sequence = [];
  let remaining = n;

  for(let i = numbers.length - 1; i >= 0; i -= 1) {
    const factor = factorial(i);
    const integerDivision = Math.floor(remaining / factor);
    sequence.push(numbers[integerDivision]);
    numbers = [...numbers.slice(0, integerDivision), ...numbers.slice(integerDivision + 1)];
    remaining -= factor * integerDivision;
  }
  return sequence;
}

lexicographicPermutations(999999);