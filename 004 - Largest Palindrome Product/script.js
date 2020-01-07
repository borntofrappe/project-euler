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

  // loop finding a palindrome from largestNumber^2 down to smallestNumber^2
  for (let i = largestNumber * largestNumber; i > smallestNumber * smallestNumber; i -= 1) {
    // to find a palindrome, coerce the number into a string and consider the characters before/after the halfway point
    const candidate = i.toString();
    const { length } = candidate;

    // reverse the order of one of the two halves to check if the two mirror one another
    const firstHalf = candidate.slice(0, Math.floor(length / 2));
    const secondHalf = candidate
      .slice(Math.ceil(length / 2))
      .split("")
      .reverse()
      .join("");

    // once a palindrome is found, set up the nested loop to find if the palindrome can be the result of the multiplication of two `n` digit numbers
    if (firstHalf === secondHalf) {
      // from the largest to the smallest n-digit number
      for (let j = largestNumber; j >= smallestNumber; j -= 1) {
        // if the j^2 is already smaller than the palindrome, checking for smaller j values is futile
        // exit the loop to consider the next palindrome
        if (j * j < i) {
          break;
        }
        // from the n-digit number to the smallest value
        for (let k = j; k >= smallestNumber; k -= 1) {
          // if the product matches the palindrome, return this value
          if (j * k === i) {
            return i;
          }
          // if the product is smaller than the palindrome, checking for smaller k values is futile
          // exit the loop to consider a smaller j value
          if (j * k < i) {
            break;
          }
        }
      }
    }
  }
  return 'Palindrome not found';
}

console.log(largestPalindromeProduct(2));