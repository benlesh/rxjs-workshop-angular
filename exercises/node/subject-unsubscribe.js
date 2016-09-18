const Rx = require('rxjs');
const Subject = Rx.Subject;
const Observable = Rx.Observable;

const subject = new Subject();

const observer = {
  next(x) { console.log(x) },
  error(err) { console.error(err) },
  complete() { console.info('done') }
};

const subscription1 = subject.subscribe(observer);
const subscription2 = Observable.interval(500).subscribe(subject);

setTimeout(() => {
  // after 2 seconds, unsubscribe from the subject without "killing" it.
  // Keep the interval going though.

  /* Add unsubscribe call here: but which one?
    `subscription1` or `subscription2`? */
}, 2000);

let subscription3;
let subscription4;
setTimeout(() => {
  // after 3 seconds, resubscribe to the subject twice with `observer`
  subscription3 = subject.subscribe(observer);
  subscription4 = subject.subscribe(observer);
}, 3000);

setTimeout(() => {
  // after 5 seconds, stop observing the values, and make the subject unusable
  // you should only have to make one subscribe call.

  /* unsubscribe code here */

  // If you did it right, the following block should
  // only log "SUCCESS! Subject is unusable"
  try {
    subject.subscribe(observer)
    throw new Error('FAIL: you were not supposed to execute this line');
  } catch (err) {
    if (err instanceof Rx.ObjectUnsubscribedError) {
      console.log('SUCCESS! Subject is unusable');
    } else {
      throw err;
    }
  }


}, 5000)
