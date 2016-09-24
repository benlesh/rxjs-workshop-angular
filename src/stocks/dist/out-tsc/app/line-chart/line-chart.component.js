var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import Highcharts from 'highcharts';
var lineChartCounter = 0;
export var LineChartComponent = (function () {
    function LineChartComponent(el) {
        this.el = el;
    }
    LineChartComponent.prototype.ngOnInit = function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        var elemId = "line-chart-" + lineChartCounter++;
        this.el.nativeElement.id = elemId;
        new Highcharts.Chart({
            chart: {
                renderTo: elemId,
                type: 'spline',
                animation: Highcharts.svg,
                marginRight: 10,
                events: {
                    load: function () {
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                    name: 'Random data',
                    data: (function () {
                        var data = [], time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
        });
    };
    LineChartComponent = __decorate([
        Component({
            selector: 'app-line-chart',
            template: "\n    <div>loading chart...</div>\n  ",
            styles: []
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], LineChartComponent);
    return LineChartComponent;
}());
//# sourceMappingURL=../../../../src/app/line-chart/line-chart.component.js.map