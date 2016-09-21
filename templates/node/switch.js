const Rx = require('rxjs');
const Observable = Rx.Observable;

const source = Observable.concat(
  Observable.of('A').delay(0),
  Observable.of('B').delay(1000),
  Observable.of('C').delay(2000)
);

// Create an interval for each arriving value, and play only the most recently
// created observable.

// FINAL_START
const nextFn = x => console.log(x);
const errorFn = err => console.error(err);
const completeFn = () => console.info('done');

// using `map` then `switch`
// source.map(x => Observable.interval(1000).mapTo(x))
//   .switch()
//   .subscribe(nextFn, errorFn, completeFn);

// Or (more efficient) using `switchMap`
source.switchMap(x => Observable.interval(100).mapTo(x))
  .subscribe(nextFn, errorFn, completeFn);
// FINAL_END
