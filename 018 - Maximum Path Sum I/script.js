function maximumPathSumI(triangle) {
  const arrays = triangle.map(row => row.map(cell => cell ? [cell] : 0));

  for(let i = 1; i < arrays.length; i += 1) {
    for(let j = 0; j < arrays[i].length; j += 1) {
      const current = arrays[i][j][0];
        const previous = arrays[i - 1][j - 1];
        const next = arrays[i - 1][j];
        arrays[i][j] = [];
        if(previous) {
          arrays[i][j] = [...arrays[i][j], ...previous.map(item => item + current)];
        }
        if(next) {
          arrays[i][j] = [...arrays[i][j], ...next.map(item => item + current)];
        }
    }
  }
  return Math.max(...arrays[arrays.length-1].reduce((acc, curr) => [...acc, ...curr], []));
}

const testTriangle = [[3, 0, 0, 0],
                      [7, 4, 0, 0],
                      [2, 4, 6, 0],
                      [8, 5, 9, 3]];

maximumPathSumI(testTriangle);
