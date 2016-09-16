var Observable = require('rxjs').Observable;

var abc = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

var data = [];

abc.forEach(function (a) {
  abc.forEach(function (b) {
    abc.forEach(function (c) {
      data.push(a + b + c);
    });
  });
});

module.exports = {
  data,
  suggest: function(q) {
    return data.filter(function(d) {
      return d.indexOf(q) === 0;
    });
  },
  getStream: function (ticker) {
    return Observable.interval(1000)
      .map(function (n) {
        return {
          ticker: ticker,
          value: (Math.random() * 10) + (Math.sin(n) * 500) + 500
        };
      })
  }
};
