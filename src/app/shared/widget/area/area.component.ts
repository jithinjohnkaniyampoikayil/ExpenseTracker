import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  @Input() data;
  highcharts = Highcharts;
  chartOptions: any;
  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Expenditure based on given csv file',
      },
      subtitle: {
        text: 'Source: csv',
      },
      xAxis: {
        categories:
          this.data.expenses.length > 0
            ? this.data.expenses.map((x) => x.category)
            : [],
        tickmarkPlacement: 'on',
        title: {
          enabled: false,
        },
      },
      yAxis: {
        title: {
          text: this.data.currency,
        },
        labels: {
          formatter: function () {
            return this.value;
          },
        },
      },
      tooltip: {
        split: false,
        valueSuffix: this.data.currency,
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666',
          },
        },
      },
      exporting: { enabled: true },
      credits: { enabled: false },
      series: [
        {
          name: 'All Years',
          data: this.data.expenses.map((x) => x.amount),
        },
      ],
    };
    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
