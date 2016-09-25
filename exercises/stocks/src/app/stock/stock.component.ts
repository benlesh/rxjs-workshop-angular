import { Component, OnInit, Input } from '@angular/core';
import { StockServerService } from '../stock-server.service';
import { Observable } from '../app.rx';

@Component({
  selector: 'app-stock',
  template: `
    <p>
      <app-line-chart [dataStream]="data$" [title]="ticker"></app-line-chart>
    </p>
  `,
  styles: []
})
export class StockComponent implements OnInit {

  @Input()
  ticker: string = '';

  get data$() {
    /* use the stockServer service to get your ticker stream here. */
    const { ticker } = this;
    return Observable.timer(0, 1000).map(() => ({ ticker, value: Math.random() * 1000 }));
  }

  constructor(private stockServer: StockServerService) { }

  ngOnInit() {
  }

}
