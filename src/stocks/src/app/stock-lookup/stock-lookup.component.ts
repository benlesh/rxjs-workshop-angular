import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from '../app.rx.ts';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-stock-lookup',
  template: `
    <div>
      <form>
        <input type="text" (blur)="clearSuggestions()" (keyup)="querie$.next($event)"/>
        <span *ngIf="error">{{error}}</span>
        <div *ngIf="suggestions">
          <p>{{suggestions.length}} suggestions</p>
          <ul>
            <li *ngFor="let suggestion of suggestions; let i = index">
              <a href="#" (click)="addTicker(suggestion)">
                {{suggestion}}
                <span *ngIf="suggestionCursor === i">
                  &lt;
                </span>
              </a>
            </li>
          </ul>
        </div>
      </form>
      <div *ngIf="tickers && tickers.length">
        <div *ngFor="let ticker of tickers">
          <button (click)="removeTicker(index)">X</button>
          {{ticker}}
        </div>
      </div>
      <line-chart></line-chart>
    </div>
  `,
  styles: []
})
export class StockLookupComponent implements OnInit, OnDestroy {

  querie$: Subject<any> = new Subject();

  // list of chosen tickers
  tickers: string[] = [];

  suggestions: string[] = null;

  error: string = null;

  subscription: Subscription;

  suggestionCursor: number = 0;

  constructor(private http: Http) { }

  private getSuggestionsURL(q: string) {
    return `http://localhost:8080/suggest/${q}`;
  }

  private getSuggestions(q: string): Observable<any> {
    return q ?
      this.http.get(this.getSuggestionsURL(q))
        .map((res: Response) => res.json()) :
        Observable.of(null);
  }

  get suggestionSelect$() {
    return this.querie$
      .map(x => x.key) // not for older browsers
      .filter(x => x === 'Enter');
  }

  get suggestion$() {
    return this.querie$
      .debounceTime(500)
      .map(e => e.target.value)
      .distinctUntilChanged()
      .switchMap(q =>
        this.getSuggestions(q)
          .map(data => ({ q, data }))
          .catch(err => Observable.of({ q, error: err, data: null }))
      );
  }


  get suggestionCursor$() {
    return Observable.merge(
      this.querie$
        .map(e => e.key) // NOT FOR OLDER BROWSERS!
        .filter(key => key === 'ArrowUp' || key === 'ArrowDown')
        .map(key => key === 'ArrowUp' ? -1 : 1)
        .scan((index, v) => Math.max(this.suggestionCursor + v, 0)),
      this.suggestion$.map(() => 0)
    );
  }

  clearSuggestions() {
    this.suggestions = null;
  }

  addTicker(ticker: string) {
    this.tickers.push(ticker);
    this.suggestions = null;
  }

  removeTicker(index: number) {
    this.tickers.splice(index, 1);
  }

  ngOnInit() {
    const setSuggestionCursor = index => this.suggestionCursor = index;
    const setSuggestions = ({q, error, data }) => {
      this.suggestions = data;
      if (error && error.status === 404) {
        this.error = `"${q}" not found`;
      }
    };

    const chooseAtCursor = () => this.addTicker(this.suggestions[this.suggestionCursor]);

    this.subscription = Observable.merge(
      this.suggestion$.do(setSuggestions),
      this.suggestionCursor$.do(setSuggestionCursor),
      this.suggestionSelect$.do(chooseAtCursor)
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
