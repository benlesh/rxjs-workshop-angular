import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from '../app.rx';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-stock-lookup',
  template: `<div>stock-lookup works</div>`,

  styles: []
})
export class StockLookupComponent implements OnInit, OnDestroy {


  // list of chosen tickers
  tickers: string[] = [];

  suggestions: string[] = null;

  error: string = null;



  get suggestion$() {
    /*
      This should return an observable of suggestions for an auto complete.
    */
    return Observable.empty(); // replace me
  }

  clearSuggestions() {
    this.suggestions = null;
  }

  addTicker(ticker: string) {
    this.tickers.push(ticker);
    this.clearSuggestions();
  }

  removeTicker(index: number) {
    this.tickers.splice(index, 1);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
