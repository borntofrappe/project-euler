function largestPalindromeProduct(n) {
  const largestNumberString = Array(n)
      .fill(9)
      .join("");

      const largestNumber = parseInt(largestNumberString, 10);

    for(let i = largestNumber; i > 0; i -= 1) {
      const product = largestNumber * i;
      const candidate = product.toString();
      const { length } = candidate;

      const firstHalf = candidate.slice(0, Math.floor(length / 2));
        const secondHalf = candidate
  .slice(Math.ceil(length / 2))
  .split("")
  .reverse()
  .join("");

  if(firstHalf === secondHalf) {
    return product;
  }
    }
}

