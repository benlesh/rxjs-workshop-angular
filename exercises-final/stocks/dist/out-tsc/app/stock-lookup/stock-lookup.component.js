var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Subject, Observable } from '../app.rx';
import { Http } from '@angular/http';
export var StockLookupComponent = (function () {
    function StockLookupComponent(http) {
        this.http = http;
        this.qKeyUp$ = new Subject();
        this.tickers = [];
        this.suggestions = null;
        this.error = null;
    }
    StockLookupComponent.prototype.getSuggestions = function (q) {
        return q ?
            this.http.get("http://localhost:8080/suggest/" + q)
                .map(function (res) { return res.json(); }) :
            Observable.of(null);
    };
    Object.defineProperty(StockLookupComponent.prototype, "suggestion$", {
        get: function () {
            var _this = this;
            return this.qKeyUp$
                .debounceTime(500)
                .map(function (e) { return e.target.value; })
                .distinctUntilChanged()
                .switchMap(function (q) {
                return _this.getSuggestions(q)
                    .map(function (data) { return ({ q: q, data: data }); })
                    .catch(function (err) { return Observable.of({ q: q, error: err, data: null }); });
            });
        },
        enumerable: true,
        configurable: true
    });
    StockLookupComponent.prototype.clearSuggestions = function () {
        this.suggestions = null;
    };
    StockLookupComponent.prototype.addTicker = function (ticker) {
        this.tickers.push(ticker);
        this.clearSuggestions();
    };
    StockLookupComponent.prototype.removeTicker = function (index) {
        this.tickers.splice(index, 1);
    };
    StockLookupComponent.prototype.ngOnInit = function () {
        var _this = this;
        var setSuggestions = function (_a) {
            var q = _a.q, error = _a.error, data = _a.data;
            _this.suggestions = data;
            if (error && error.status === 404) {
                _this.error = "\"" + q + "\" not found";
            }
        };
        this.subscription = this.suggestion$.subscribe(setSuggestions);
    };
    StockLookupComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    StockLookupComponent = __decorate([
        Component({
            selector: 'app-stock-lookup',
            template: "<div>stock-lookup works</div>",
            template: "\n    <div wee>\n      <form #myForm (submit)=\"addTicker(myForm.value.q)\">\n        <input id=\"q\" name=\"q\" type=\"text\" (blur)=\"clearSuggestions()\" (keyup)=\"qKeyUp$.next($event)\"/>\n        <span *ngIf=\"error\">{{error}}</span>\n        <div *ngIf=\"suggestions\">\n          <p>{{suggestions.length}} suggestions</p>\n          <ul>\n            <li *ngFor=\"let suggestion of suggestions; let i = index\">\n              <a href=\"#\" (click)=\"addTicker(suggestion)\">\n                {{suggestion}}\n              </a>\n            </li>\n          </ul>\n        </div>\n      </form>\n      <div *ngIf=\"tickers && tickers.length\">\n        <div *ngFor=\"let ticker of tickers\">\n          <button (click)=\"removeTicker(index)\">X</button>\n          <app-stock [ticker]=\"ticker\"></app-stock>\n        </div>\n      </div>\n    </div>\n  ",
            styles: []
        }), 
        __metadata('design:paramtypes', [Http])
    ], StockLookupComponent);
    return StockLookupComponent;
}());
//# sourceMappingURL=../../../../src/app/stock-lookup/stock-lookup.component.js.map