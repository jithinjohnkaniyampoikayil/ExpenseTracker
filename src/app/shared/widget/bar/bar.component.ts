import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  @Input() expenses;
  @Input() currency;
  highcharts = Highcharts;
  chartOptions: any;
  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Expenditure based on given csv file',
      },
      subtitle: {
        text: 'Source: CSV',
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 250,
        y: 100,
        floating: true,
        borderWidth: 1,

        shadow: true,
      },
      xAxis: {
        categories: this.expenses.map((x) => x.category),
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: this.currency,
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
      },
      tooltip: {
        valueSuffix: this.currency,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: 'Year 2021',
          data: this.expenses.map((x) => x.amount),
        },
      ],
    };
  }
}
