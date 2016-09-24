import { Injectable } from '@angular/core';
import { WebSocketSubjectFactoryService } from './web-socket-subject-factory.service';
import { WebSocketSubject } from './app.rx';

@Injectable()
export class StockServerService {
  socket: WebSocketSubject<any>;

  getTicker(ticker: string) {
    return this.socket.multiplex(
      () => JSON.stringify({ type: 'sub', ticker }),
      () => JSON.stringify({ type: 'unsub', ticker }),
      (d: any) => d.ticker === ticker
    );
  }

  constructor(webSocketFactory: WebSocketSubjectFactoryService) {
    this.socket = webSocketFactory.create('ws://localhost:8080/');
  }
}
