const Rx = require('rxjs');

const Observable = Rx.Observable;

const a = Observable.interval(100).mapTo('A').take(12);
const b = Observable.interval(200).mapTo('B').take(5);
const c = Observable.interval(300).mapTo('C').take(10);

// Use any merge operator to run each of the Observables
// simultaneously and emit all values on one stream

const nextFn = x => console.log(x);
const errorFn = err => console.error(err);
const completeFn = () => console.info('done');

/* You can do any of the following */
// Use mergeAll on an Obsevable<Observable>
// Observable.of(a, b, c).mergeAll()
//   .subscribe(nextFn, errorFn, completeFn);

// Use the merge member method
// a.merge(b, c)
//   .subscribe(nextFn, errorFn, completeFn);

// Use the merge static method
Observable.merge(a, b, c)
  .subscribe(nextFn, errorFn, completeFn);
