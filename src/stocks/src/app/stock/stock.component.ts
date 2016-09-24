import { Component, OnInit, Input } from '@angular/core';
import { StockServerService } from '../stock-server.service';

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
    return this.stockServer.getTicker(this.ticker)
      .map((d:any) => d.value);
  }

  constructor(private stockServer: StockServerService) { }

  ngOnInit() {
  }

}
