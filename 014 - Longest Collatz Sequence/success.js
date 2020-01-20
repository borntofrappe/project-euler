function longestCollatzSequence(limit) {
  const sequences = {};
  for (let i = 1; i < limit; i += 1) {
    let n = i;
    const sequence = [n];
    while (n > 1) {
      if (sequences[n]) {
        sequences[i] = [...sequence, ...sequences[n].slice(1)];
        delete sequences[n];
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
      sequences[i] = sequence;
    }
  }

  const entries = Object.entries(sequences).sort((a, b) =>
    a[1].length < b[1].length ? 1 : -1
  );
  return parseInt(entries[0][0]);
}
longestCollatzSequence(1000);