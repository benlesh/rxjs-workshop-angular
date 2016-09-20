const Rx = require('rxjs');

const Observable = Rx.Observable;

Observable.of(1, 2, 3, 4)
  .do(n => {
    if (n === 3) {
      throw new Error('I really hate threes');
    }
  })
  .catch(err => Observable.of('error handled'))
  .subscribe(
    x => console.log(x),
    err => console.error(err),
    () => console.info('done')
  )
