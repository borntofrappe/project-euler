function namesScores(arr) {
  return arr
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce((acc, curr, index) => {
      const order = index + 1;
      const score = curr.split("").reduce((acc, curr) => acc + curr.charCodeAt(0) - "A".charCodeAt(0) + 1, 0);
      return acc + score * order;
    }, 0);
}

// Only change code above this line
const test1 = ['THIS', 'IS', 'ONLY', 'A', 'TEST'];
const test2 = ['I', 'REPEAT', 'THIS', 'IS', 'ONLY', 'A', 'TEST'];

namesScores(test1);
