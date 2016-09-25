import { Injectable } from '@angular/core';
import { WebSocketSubjectFactoryService } from './web-socket-subject-factory.service';
import { Observable, WebSocketSubject } from './app.rx';

@Injectable()
export class StockServerService {
  socket: WebSocketSubject<any>;

  getTicker(ticker: string) {
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
  }

  constructor(webSocketFactory: WebSocketSubjectFactoryService) {
    this.socket = webSocketFactory.create('ws://localhost:8080/');
  }
}
