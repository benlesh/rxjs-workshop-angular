const Rx = require('rxjs');

const Observable = Rx.Observable;

let starts = 0;

const cold = new Observable(observer => {
  starts++; // side effect to count starts
  /*
    Add code here to make your observable.
    Try sync and async flavors.
  */
});

/*
add code here to create an observable named `hot`
that is a "hot" version of your `cold` observable above..
for example:

const hot = ????;
*/

console.log('subscribing to `cold` twice:');
cold.subscribe(x => console.log('next', x));
console.log('starts:', starts);
cold.subscribe(x => console.log('next', x));
console.log('starts:', starts);

// reset count
starts = 0;

console.log('subscribing to `hot` twice:');
hot.subscribe(x => console.log('next', x));
console.log('starts:', starts);
hot.subscribe(x => console.log('next', x));
console.log('starts:', starts);
