import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from '../app.rx';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-stock-lookup',
  // WORKSHOP_START
  template: `<div>stock-lookup works</div>`,
  // WORKSHOP_END

  // FINAL_START
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
  // FINAL_END
  styles: []
})
export class StockLookupComponent implements OnInit, OnDestroy {

  // FINAL_START
  // key up events for the q input field
  qKeyUp$: Subject<any> = new Subject();
  // FINAL_END

  // list of chosen tickers
  tickers: string[] = [];

  suggestions: string[] = null;

  error: string = null;

  // FINAL_START
  subscription: Subscription;
  // FINAL_END

  // FINAL_START
  constructor(private http: Http) { }

  private getSuggestions(q: string): Observable<any> {
    return q ?
      this.http.get(`http://localhost:8080/suggest/${q}`)
        .map((res: Response) => res.json()) :
        Observable.of(null);
  }
  // FINAL_END

  get suggestion$() {
    // WORKSHOP_START
    /*
      This should return an observable of suggestions for an auto complete.
    */
    return Observable.empty(); // replace me
    // WORKSHOP_END
    // FINAL_START
    return this.qKeyUp$
      .debounceTime(500)
      .map(e => e.target.value)
      .distinctUntilChanged()
      .switchMap(q =>
        this.getSuggestions(q)
          .map(data => ({ q, data }))
          .catch(err => Observable.of({ q, error: err, data: null }))
      );
    // FINAL_END
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
    // FINAL_START
    const setSuggestions = ({q, error, data }) => {
      this.suggestions = data;
      if (error && error.status === 404) {
        this.error = `"${q}" not found`;
      }
    };

    this.subscription = this.suggestion$.subscribe(setSuggestions);
    // FINAL_END
  }

  ngOnDestroy() {
    // FINAL_START
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // FINAL_END
  }
}
