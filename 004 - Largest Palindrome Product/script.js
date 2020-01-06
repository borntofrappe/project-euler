function largestPalindromeProduct(n) {
  // largest n digit number
  const largestNumberString = Array(n)
    .fill(9)
    .join("");

  const largestNumber = parseInt(largestNumberString, 10);

  // smallest n digit number
  const smallestNumberString = Array(n)
    .fill("")
    .map((val, index) => (index === 0 ? 1 : 0))
    .join("");

  const smallestNumber = parseInt(smallestNumberString, 10);

  // loop finding a palindrome starting from largestNumber^2
  for (let i = largestNumber * largestNumber; i > 0; i -= 1) {
    // find a palindrome
    const candidate = i.toString();
    const { length } = candidate;

    const firstHalf = candidate.slice(0, Math.floor(length / 2));
    const secondHalf = candidate
      .slice(Math.ceil(length / 2))
      .split("")
      .reverse()
      .join("");

    // once a palindrome is found, set up the nested loop to find if the palindrome can be the result of the multiplication of two `n` digit numbers
    if (firstHalf === secondHalf) {
      for (let j = largestNumber; j >= smallestNumber; j -= 1) {
        if (j * j < i) {
          break;
        }
        for (let k = j; k >= smallestNumber; k -= 1) {
          if (j * k === i) {
            return i;
          }
          if (j * k < i) {
            break;
          }
        }
      }
    }
  }
}

console.log(largestPalindromeProduct(2));