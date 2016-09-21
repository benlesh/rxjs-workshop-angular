const Rx = require('rxjs');
const Observable = Rx.Observable;

const source = Observable.interval(100).take(10);

const mapEverythingButFours = x => {
  if (x === 4) {
    throw new Error('fours are bad');
  }
  return x + '!';
}

// Use the above mapping function, `mapEverythingButFours`, to map all of the
// values from `source`. In the event of an error in your mapping function, just
// skip the value. Log the values out to console

// FINAL_START
source.mergeMap(
  n => Observable.of(n)
    .map(mapEverythingButFours)
    .catch(err => Observable.empty())
)
.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);
// FINAL_END
