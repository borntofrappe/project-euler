function multiplesOf3and5(number) {
  const pattern = [3, 2, 1, 3, 1, 2, 3];
  let index = 0;

  const multiples = [];

  for(let i = 3; i < number; i += pattern[index]) {
    multiples.push(i)
    index = (index + 1) % pattern.length;
  }

  return multiples.reduce((acc, curr) => acc + curr, 0);
}
console.log(multiplesOf3and5(100));