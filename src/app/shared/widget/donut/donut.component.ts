import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss'],
})
export class DonutComponent implements OnInit {
  @Input() data;
  highcharts = Highcharts;
  chartOptions: any;
  _data: any = [];
  constructor() {}

  ngOnInit(): void {
    this.data.expenses.forEach((element, index) => {
      let arr = [];
      arr.push(element.category, element.amount);
      this._data.push(arr);
    });
    this._data.shift();
    this.chartOptions = {
      chart: {
        plotBorderWidth: null,
        plotShadow: false,
      },
      title: {
        text: 'Expenditure based on given csv file',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%'],
          size: '45%',
          innerSize: '40%',
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Browser share',
          data: this._data,
        },
      ],
    };
  }
}
