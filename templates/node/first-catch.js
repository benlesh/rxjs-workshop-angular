const Rx = require('rxjs');

const Observable = Rx.Observable;

Observable.of(1, 2, 3, 4)
  .do(n => {
    if (n === 3) {
      throw new Error('I really hate threes');
    }
  })
  // WORKSHOP_START
  // add a catch block that handles the error and
  // emits `"error handled"` to the subscriber.
  // .catch(????)
  // WORKSHOP_END
  // FINAL_START
  .catch(err => Observable.of('error handled'))
  // FINAL_END
  .subscribe(
    x => console.log(x),
    err => console.error(err),
    () => console.info('done')
  )
