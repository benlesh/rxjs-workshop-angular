var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { WebSocketSubjectFactoryService } from './web-socket-subject-factory.service';
import { Observable } from './app.rx';
export var StockServerService = (function () {
    function StockServerService(webSocketFactory) {
        this.socket = webSocketFactory.create('ws://localhost:8080/');
    }
    StockServerService.prototype.getTicker = function (ticker) {
        return Observable.timer(0, 1000).map(function () { return ({ ticker: ticker, value: Math.random() * 1000 }); });
        return this.socket.multiplex(function () { return JSON.stringify({ type: 'sub', ticker: ticker }); }, function () { return JSON.stringify({ type: 'unsub', ticker: ticker }); }, function (d) { return d.ticker === ticker; })
            .retryWhen(function (errors) {
            return errors
                .do(function (err) {
                console.error(err);
            })
                .switchMap(function (err) { return Observable.timer(1000); });
        });
    };
    StockServerService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [WebSocketSubjectFactoryService])
    ], StockServerService);
    return StockServerService;
}());
//# sourceMappingURL=../../../src/app/stock-server.service.js.map