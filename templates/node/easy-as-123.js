var Rx = require('rxjs');

// WORKSHOP_START
/*
  Create an observable that emits 1, 2, and 3 then completes.
  Subscribe to it and log the output to console.

  BONUS: Try logging before, during and after the subscription. Notice anything?
*/
// WORKSHOP_END

// FINAL_START
var myObservable = new Rx.Observable(observer => {
  console.log('subscribing');
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

console.log('before subscription');

myObservable.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);

console.log('after subscription');
// FINAL_END
