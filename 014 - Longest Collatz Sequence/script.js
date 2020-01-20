function longestCollatzSequence(limit) {
  const sequences = [];
  for (let i = 1; i < limit; i += 1) {
    let n = i;
    const sequence = [n];
    while (n > 1) {
      if (n % 2 === 0) {
        n /= 2;
      } else {
        n = n * 3 + 1;
      }
      sequence.push(n);
    }
    sequences.push(sequence);
  }
  return sequences.sort((a, b) => (a.length < b.length ? 1 : -1))[0][0];
}

longestCollatzSequence(1000);
