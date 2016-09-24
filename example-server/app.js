var restify = require('restify');
var errors = require('restify-errors');
var WebSocketServer = require('ws').Server;
var url = require('url');
var data = require('./data');

var server = restify.createServer();
var wss = new WebSocketServer({ server: server });


server.use(restify.CORS({
  origins: ['*'],
  credentials: false
}));

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  var subs = {};

  ws.on('message', function incoming(message) {
    var payload = JSON.parse(message);
    if (payload.type === 'sub') {
      var tickerStream = data.getStream(payload.ticker);
      subs[payload.ticker] = tickerStream.subscribe(function (d) {
        ws.send(JSON.stringify(d));
      });
    } else if (payload.type = 'unsub') {
      var sub = subs[payload.ticker];
      if (sub) {
        sub.unsubscribe();
        subs[payload.ticker] = null;
      }
    }
  });

  ws.on('close', function () {
    Object.keys(subs).forEach(function(key) {
      if (subs[key]) {
        subs[key].unsubscribe();
      }
    });
  });
});


server.get('/ping/:value', function ping(req, res, next) {
  res.send({ pong: req.params.value})
  return next();
});

server.get('/suggest/:q', function suggest(req, res, next) {
  var q = req.params.q;
  if (q.length > 1) {
    var result = data.suggest(req.params.q);
    if (!result || result.length === 0) {
      return next(new errors.NotFoundError());
    } else {
      res.send(result);
      return next();
    }
  }
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
