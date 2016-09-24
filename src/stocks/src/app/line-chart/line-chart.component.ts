import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, Subscription } from '../app.rx';

let lineChartCounter = 0;

@Component({
  selector: 'app-line-chart',
  template: `
    <div>loading chart...</div>
  `,
  styles: []
})
export class LineChartComponent implements OnInit, OnDestroy {

  @Input('dataStream')
  dataStream: Observable<any>;

  @Input()
  title: string;

  subscription: Subscription;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const { dataStream, title } = this;
    const self = this;

    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });

    const elemId = `line-chart-${lineChartCounter++}`;

    this.el.nativeElement.id = elemId;

    new Highcharts.Chart({
      chart: {
        renderTo: elemId,
        type: 'spline',
        animation: true,
        marginRight: 10,
        events: {
          load: function () {

            // set up the updating of the chart each second
            let series = this.series[0];

            if (!dataStream) {
              throw new Error('no data stream provided');
            }

            self.subscription = dataStream.subscribe(
              y => series.addPoint([(new Date()).getTime(), y], true, true)
            );
          }
        }
      },
        title: {
          text: title
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
            // generate an array of random data
            let data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: 0
              });
            }
            return data;
          }())
        }]
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
