// your source array
var source = [1, 2, 3, 4, 5];

// Using Array's filter, map and reduce
// for each of the values in `source`
// 1. Take only the odd numbers
// 2. Multiply them by 3
// 3. Add them together

var result = source
  .filter(n => n % 2 === 1)
  .map(n => n * 3)
  .reduce((state, n) => state + n, 0);

console.assert(result === 27, `${result} should be 27`);
console.log('SUCCESS!', result);
