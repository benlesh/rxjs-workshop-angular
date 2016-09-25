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
export var TimerComponent = (function () {
    function TimerComponent() {
        this.displayValue = '';
        this.tick$ = Observable.timer(0, 1000)
            .scan(function (_a) {
            var start = _a.start, current = _a.current;
            var now = Date.now();
            if (typeof start === 'undefined') {
                return { start: current, current: now };
            }
            else {
                ;
                return { start: start, current: now };
            }
        }, {})
            .map(function (_a) {
            var start = _a.start, current = _a.current;
            return current - start;
        })
            .map(function (ms) { return (ms + "ms"); });
        this.click$ = new Subject();
    }
    Object.defineProperty(TimerComponent.prototype, "toggle$", {
        get: function () {
            return this.click$
                .scan(function (state) { return !state; }, false)
                .startWith(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerComponent.prototype, "timer$", {
        get: function () {
            var _this = this;
            return this.toggle$.switchMap(function (shouldRun) { return shouldRun ? _this.tick$ : Observable.empty(); });
        },
        enumerable: true,
        configurable: true
    });
    TimerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.timer$.subscribe(function (time) { return _this.displayValue = time; });
    };
    TimerComponent.prototype.ngOnDestroy = function () {
    };
    TimerComponent = __decorate([
        Component({
            selector: 'app-timer',
            template: "\n    <div style=\"border: 1px solid red\" (click)=\"click$.next()\">\n      {{displayValue}}\n      <div>{{ (tick$ | async)?.length }}</div>\n    </div>\n  ",
            styles: []
        }), 
        __metadata('design:paramtypes', [])
    ], TimerComponent);
    return TimerComponent;
}());
//# sourceMappingURL=../../../../src/app/timer/timer.component.js.map