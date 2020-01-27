function properDivisors(n) {
  const divisors = [];

  for (let i = 1; i <= Math.sqrt(n); i += 1) {
    if (n % i === 0) {
      divisors.push(i);

      const j = n / i;
      if (j !== i && j !== n) {
        divisors.push(j);
      }
    }
  }

  return divisors;
}


function amicableNumbers(n) {
  const numbers = Array(n);

  while(true) {
    const number = numbers.findIndex(number => number === undefined);
    if(number === -1) {
      break;
    } else {
      const sum1 = properDivisors(number).reduce((acc, curr) => acc + curr, 0);
      if(sum1 < numbers.length && numbers[sum1] === undefined) {
        const sum2 = properDivisors(sum1).reduce((acc, curr) => acc + curr, 0);
        if(number === sum2 && number !== sum1) {
          numbers[number] = true;
          numbers[sum1] = true;
        } else {
          numbers[number] = false;
          numbers[sum1] = false;
        }

      } else {
        numbers[number] = false;
      }
    }
  }

  return numbers
    .map((number, index) => number ? index : null)
    .filter(number => number);
}

amicableNumbers(2000);