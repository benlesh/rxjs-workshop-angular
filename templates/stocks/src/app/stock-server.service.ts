import { Injectable } from '@angular/core';
import { WebSocketSubjectFactoryService } from './web-socket-subject-factory.service';
import { Observable, WebSocketSubject } from './app.rx';

@Injectable()
export class StockServerService {
  socket: WebSocketSubject<any>;

  getTicker(ticker: string) {
    // WORKSHOP_START
    /* Add code to use a multiplexed web socket to get a stream
      of updates from `ws://localhost:8080`. You can run the example-server from
      the root directory of the repo: `node example-server/app.js` */
    return Observable.timer(0, 1000).map(() => ({ ticker, value: Math.random() * 1000 }));
    // WORKSHOP_END
    // FINAL_START
    return this.socket.multiplex(
      () => JSON.stringify({ type: 'sub', ticker }),
      () => JSON.stringify({ type: 'unsub', ticker }),
      (d: any) => d.ticker === ticker
    )
    .retryWhen(errors =>
      errors
        .do((err) => {
          console.error(err);
        })
        .switchMap(err => Observable.timer(1000))
    );
    // FINAL_END
  }

  // FINAL_START
  constructor(webSocketFactory: WebSocketSubjectFactoryService) {
    this.socket = webSocketFactory.create('ws://localhost:8080/');
  }
  // FINAL_END

  // WORKSHOP_START
  constructor() {
  }
  // WORKSHOP_END
}
