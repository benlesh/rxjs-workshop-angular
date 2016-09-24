import { Injectable } from '@angular/core';
import { WebSocketSubject } from './app.rx';

@Injectable()
export class WebSocketSubjectFactoryService {
  constructor() {
  }

  create(url: string): WebSocketSubject<any> {
    return new WebSocketSubject(url);
  }
}
