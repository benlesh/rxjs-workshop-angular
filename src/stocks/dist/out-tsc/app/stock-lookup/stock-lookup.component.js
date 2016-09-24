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
import { Subject, Observable } from '../app.rx.ts';
import { Http } from '@angular/http';
export var StockLookupComponent = (function () {
    function StockLookupComponent(http) {
        this.http = http;
        this.querie$ = new Subject();
        this.tickers = [];
        this.suggestions = null;
        this.error = null;
        this.suggestionCursor = 0;
    }
    StockLookupComponent.prototype.getSuggestionsURL = function (q) {
        return "http://localhost:8080/suggest/" + q;
    };
    StockLookupComponent.prototype.getSuggestions = function (q) {
        return q ?
            this.http.get(this.getSuggestionsURL(q))
                .map(function (res) { return res.json(); }) :
            Observable.of(null);
    };
    Object.defineProperty(StockLookupComponent.prototype, "suggestionSelect$", {
        get: function () {
            return this.querie$
                .map(function (x) { return x.key; })
                .filter(function (x) { return x === 'Enter'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StockLookupComponent.prototype, "suggestion$", {
        get: function () {
            var _this = this;
            return this.querie$
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
    Object.defineProperty(StockLookupComponent.prototype, "suggestionCursor$", {
        get: function () {
            var _this = this;
            return Observable.merge(this.querie$
                .map(function (e) { return e.key; })
                .filter(function (key) { return key === 'ArrowUp' || key === 'ArrowDown'; })
                .map(function (key) { return key === 'ArrowUp' ? -1 : 1; })
                .scan(function (index, v) { return Math.max(_this.suggestionCursor + v, 0); }), this.suggestion$.map(function () { return 0; }));
        },
        enumerable: true,
        configurable: true
    });
    StockLookupComponent.prototype.clearSuggestions = function () {
        this.suggestions = null;
    };
    StockLookupComponent.prototype.addTicker = function (ticker) {
        this.tickers.push(ticker);
        this.suggestions = null;
    };
    StockLookupComponent.prototype.removeTicker = function (index) {
        this.tickers.splice(index, 1);
    };
    StockLookupComponent.prototype.ngOnInit = function () {
        var _this = this;
        var setSuggestionCursor = function (index) { return _this.suggestionCursor = index; };
        var setSuggestions = function (_a) {
            var q = _a.q, error = _a.error, data = _a.data;
            _this.suggestions = data;
            if (error && error.status === 404) {
                _this.error = "\"" + q + "\" not found";
            }
        };
        var chooseAtCursor = function () { return _this.addTicker(_this.suggestions[_this.suggestionCursor]); };
        this.subscription = Observable.merge(this.suggestion$.do(setSuggestions), this.suggestionCursor$.do(setSuggestionCursor), this.suggestionSelect$.do(chooseAtCursor)).subscribe();
    };
    StockLookupComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    StockLookupComponent = __decorate([
        Component({
            selector: 'app-stock-lookup',
            template: "\n    <div>\n      <form>\n        <input type=\"text\" (blur)=\"clearSuggestions()\" (keyup)=\"querie$.next($event)\"/>\n        <span *ngIf=\"error\">{{error}}</span>\n        <div *ngIf=\"suggestions\">\n          <p>{{suggestions.length}} suggestions</p>\n          <ul>\n            <li *ngFor=\"let suggestion of suggestions; let i = index\">\n              <a href=\"#\" (click)=\"addTicker(suggestion)\">\n                {{suggestion}}\n                <span *ngIf=\"suggestionCursor === i\">\n                  &lt;\n                </span>\n              </a>\n            </li>\n          </ul>\n        </div>\n      </form>\n      <div *ngIf=\"tickers && tickers.length\">\n        <div *ngFor=\"let ticker of tickers\">\n          <button (click)=\"removeTicker(index)\">X</button>\n          {{ticker}}\n        </div>\n      </div>\n    </div>\n  ",
            styles: []
        }), 
        __metadata('design:paramtypes', [Http])
    ], StockLookupComponent);
    return StockLookupComponent;
}());
//# sourceMappingURL=../../../../src/app/stock-lookup/stock-lookup.component.js.map