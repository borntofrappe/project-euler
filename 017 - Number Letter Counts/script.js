const dictionary = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
}

function numberLetterCounts(limit) {
  if(limit <= 0) {
    return 0;
  }
  let number = limit;
  let word = '';

  // thousands
  if(number > 999) {
    const thousands = parseInt(`${number}`[0], 10);
    word += dictionary[thousands];
    word += 'thousand';

    number -= thousands * 1000;
  }

  // hundreds
  if(number > 99) {
    const hundreds = parseInt(`${number}`[0], 10);
    word += dictionary[hundreds];
    word += 'hundred';

    number -= hundreds * 100;
    if(number > 0) {
      word += 'and';
    }
  }

  // tens and units
  if(number > 20) {
    const tens = parseInt(`${number}`[0], 10);
    const unit = parseInt(`${number}`[1], 10);
    word += dictionary[tens * 10];

    if(unit > 0) {
      word += dictionary[unit];
    }
  } else if(number > 0) {
    word += dictionary[number];
  }

  return word.length + numberLetterCounts(limit - 1);
}

numberLetterCounts(1000);
