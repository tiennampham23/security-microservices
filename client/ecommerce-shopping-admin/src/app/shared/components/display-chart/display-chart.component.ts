import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexMarkers, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexFill } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  fill: ApexFill
};

@Component({
  selector: 'app-display-chart',
  templateUrl: './display-chart.component.html',
  styleUrls: ['./display-chart.component.scss']
})
export class DisplayChartComponent implements OnChanges {
  @Input() dataSource: any;
  @Input() chartType: string;

  chartOptions: Partial<ChartOptions>;
  constructor() { }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.chartOptions = {
        series: [
          ...this.dataSource.series
        ],
        chart: {
          width: '100%',
          height: 'auto',
          type: 'line',
          zoom: {
            enabled: true
          },
          toolbar: {
            show: false
          }
        },
        markers: {
          size: 2,
          hover: {
            size: 4
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        xaxis: {
          categories: [
            ...this.dataSource.labels
          ]
        }
      };
    }
  }

}
