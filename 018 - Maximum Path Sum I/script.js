function maximumPathSumI(triangle) {
  const sums = triangle.map(row => row.map(cell => (cell ? [cell] : 0)));

  for (let i = 1; i < sums.length; i += 1) {
    for (let j = 0; j < sums[i].length; j += 1) {
      const current = sums[i][j];
      if(current) {
        const northWest = sums[i - 1][j - 1];
        const northEast = sums[i - 1][j];

        sums[i][j] = [];
        const currentValue = current[0];
        if (northWest) {
          sums[i][j] = [...sums[i][j], ...northWest.map(value => value + currentValue)];
        }
        if (northEast) {
          sums[i][j] = [...sums[i][j], ...northEast.map(value => value + currentValue)];
        }
      }
    }
  }

  const flat = sums[sums.length - 1].reduce((acc, curr) => [...acc, ...curr], []);
  return Math.max(...flat);
}

const testTriangle = [[3, 0, 0, 0],
                      [7, 4, 0, 0],
                      [2, 4, 6, 0],
                      [8, 5, 9, 3]];

maximumPathSumI(testTriangle);
