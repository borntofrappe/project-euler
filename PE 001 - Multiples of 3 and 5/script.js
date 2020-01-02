function multiplesOf3and5(number) {
  const pattern = [3, 2, 1, 3, 1, 2, 3];
  let counter = 3;
  let index = 1;

  const multiples = [];
  for(let i = counter; i < number; i += pattern[index]) {
    multiples.push(counter)
    counter += pattern[index];
    index = (index + 1) % pattern.length;
  }
  return multiples.reduce((acc, curr) => acc + curr, 0);
}
console.log(multiplesOf3and5(51));