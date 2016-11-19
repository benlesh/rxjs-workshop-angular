var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { StockServerService } from '../stock-server.service';
import { Observable } from '../app.rx';
export var StockComponent = (function () {
    function StockComponent(stockServer) {
        this.stockServer = stockServer;
        this.ticker = '';
    }
    Object.defineProperty(StockComponent.prototype, "data$", {
        get: function () {
            var ticker = this.ticker;
            return Observable.timer(0, 1000).map(function () { return ({ ticker: ticker, value: Math.random() * 1000 }); });
            return this.stockServer.getTicker(this.ticker)
                .map(function (d) { return d.value; });
        },
        enumerable: true,
        configurable: true
    });
    StockComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], StockComponent.prototype, "ticker", void 0);
    StockComponent = __decorate([
        Component({
            selector: 'app-stock',
            template: "\n    <p>\n      <app-line-chart [dataStream]=\"data$\" [title]=\"ticker\"></app-line-chart>\n    </p>\n  ",
            styles: []
        }), 
        __metadata('design:paramtypes', [StockServerService])
    ], StockComponent);
    return StockComponent;
}());
//# sourceMappingURL=../../../../src/app/stock/stock.component.js.map