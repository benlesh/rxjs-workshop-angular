const Rx = require('rxjs');

const Subject = Rx.Subject;

// Create a Subject
// FINAL_START
const subject = new Subject();
// FINAL_END

// Subscribe to it and send a few values
// as a bonus, subcsribe twice to see what happens
// NOTE: If you're not subscribed before you `next`, it will not push
// those values through to your handlers, because it doesn't know about them yet
// FINAL_START
const subscription = subject.subscribe(
  x => console.log('next', x),
  err => console.error(err),
  () => console.info('done')
);

const subscription2 = subject.subscribe(
  x => console.log('next', x),
  err => console.error(err),
  () => console.info('done')
);

subject.next(1);
subject.next(2);
// FINAL_END

// Complete the Subject and see what happens when you try to next
// FINAL_START
subject.complete();
subject.next('are you done?'); // nothing happens.
// FINAL_END
