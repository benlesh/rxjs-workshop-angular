const Rx = require('rxjs');
const Subject = Rx.Subject;
const Observable = Rx.Observable;

let count = 0;

// use this twice to put the values through from source
const observer = {
  next(x) { console.log(x) },
  error(err) { console.error(err) },
  complete() { console.info('done') }
};

// subscribe to this only once
const source = new Observable(observer => {
  if (++count > 1) {
    throw new Error('too many subscriptions');
  }
  return Observable.interval(500).take(4)
    .subscribe(observer);
});

// log out the values from source twice with two subscriptions using `observer`,
// but `source` won't let you subscribe more than once.

// HINT: Subjects can be used as observers,
//   and they multicast when used as observables.

//FINAL_START
const subject = new Subject();

subject.subscribe(observer);
subject.subscribe(observer);

source.subscribe(subject);
//FINAL_END
