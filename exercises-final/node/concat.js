const Rx = require('rxjs');

const Observable = Rx.Observable;

const a = Observable.interval(100).map(n => 'A' + n).take(3);
const b = Observable.interval(200).map(n => 'B' + n).take(3);
const c = Observable.interval(300).map(n => 'C' + n).take(3);

// Use any concat operator to play each observable back to back

const nextFn = x => console.log(x);
const errorFn = err => console.error(err);
const completeFn = () => console.info('done');

// You can do it any of a number of ways
// with `concatAll`
// Observable.of(a, b, c).concatAll()
//   .subscribe(nextFn, errorFn, completeFn);

// with the `concat` instance method
// a.concat(b, c)
//   .subscribe(nextFn, errorFn, completeFn);

// with the `concat` static operator
Observable.concat(a, b, c)
  .subscribe(nextFn, errorFn, completeFn);
