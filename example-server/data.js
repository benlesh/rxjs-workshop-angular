var Observable = require('rxjs').Observable;

var abc = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

var data = [];

abc.forEach(function (a, i) {
  abc.forEach(function (b, ii) {
    abc.forEach(function (c, iii) {
      data.push({
        ticker: a + b + c,
        seed: (i * 100 * abc.length) + (ii * 10 * abc.length) + i
      });
    });
  });
});

module.exports = {
  data,
  suggest: function(q) {
    return data.filter(function(d) {
      return d.ticker.indexOf(q) === 0;
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
