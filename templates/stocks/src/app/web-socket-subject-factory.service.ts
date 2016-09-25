import { Injectable } from '@angular/core';
import { WebSocketSubject } from './app.rx';

// This is a way to make WebSocketSubject injectable for ng2
@Injectable()
export class WebSocketSubjectFactoryService {
  constructor() {
  }

  create(url: string): WebSocketSubject<any> {
    return new WebSocketSubject(url);
  }
}
