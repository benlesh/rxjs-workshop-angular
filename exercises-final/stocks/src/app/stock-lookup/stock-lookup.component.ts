import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from '../app.rx';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-stock-lookup',

  template: `
    <div>
      <form #myForm (submit)="addTicker(myForm.value.q)">
        <input id="q" name="q" type="text" (keyup)="qKeyUp$.next($event)"/>
        <span *ngIf="error">{{error}}</span>
        <div *ngIf="suggestions">
          <p>{{suggestions.length}} suggestions</p>
          <ul>
            <li *ngFor="let suggestion of suggestions; let i = index">
              <button (click)="addTicker(suggestion)">
                {{suggestion}}
              </button>
            </li>
          </ul>
        </div>
      </form>
      <div *ngIf="tickers && tickers.length">
        <div *ngFor="let ticker of tickers">
          <button (click)="removeTicker(index)">X</button>
          <app-stock [ticker]="ticker"></app-stock>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class StockLookupComponent implements OnInit, OnDestroy {

  // key up events for the q input field
  qKeyUp$: Subject<any> = new Subject();

  // list of chosen tickers
  tickers: string[] = [];

  suggestions: string[] = null;

  error: string = null;

  subscription: Subscription;

  constructor(private http: Http) { }

  private getSuggestions(q: string): Observable<any> {
    return q ?
      this.http.get(`http://localhost:8080/suggest/${q}`)
        .map((res: Response) => res.json()) :
        Observable.of(null);
  }

  get suggestion$() {
    return this.qKeyUp$
      .debounceTime(500)
      .map(e => e.target.value)
      .distinctUntilChanged()
      .switchMap(q =>
        this.getSuggestions(q)
          .map(data => ({ q, data }))
          .catch(err => Observable.of({ q, error: err, data: null }))
      );
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
    const setSuggestions = ({q, error, data }) => {
      this.suggestions = data;
      if (error && error.status === 404) {
        this.error = `"${q}" not found`;
      }
    };

    this.subscription = this.suggestion$.subscribe(setSuggestions);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
