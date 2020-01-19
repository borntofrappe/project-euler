function longestCollatzSequence(limit) {
  const sequences = [];
  for (let i = 1; i < limit; i += 1) {
    let n = i;
    const sequence = [n];
    while (n > 1) {
      const index = sequences.findIndex(([value]) => value === n);
      if (index !== -1) {
        sequences[index] = [...sequence, ...sequences[index].slice(1)];
        break;
      }
      if (n % 2 === 0) {
        n /= 2;
      } else {
        n = n * 3 + 1;
      }
      sequence.push(n);
    }
    if (n === 1) {
      sequences.push(sequence);
    }
  }
  return sequences;
}
longestCollatzSequence(16);
