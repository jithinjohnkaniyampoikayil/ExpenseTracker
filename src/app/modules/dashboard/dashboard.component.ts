import { Component, OnInit } from '@angular/core';
import { Defaults } from 'src/app/models/defaults';
import { DynamicLoader } from 'src/app/models/dynamicloader';
import { ComponentLoaderService } from 'src/app/services/component-loader.service';

import { ExpenseService } from '../../services/expense.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currency: string = Defaults.currency;
  components: DynamicLoader[];
  public selectedYear: string = Defaults.year;
  constructor(private componentLoaderService: ComponentLoaderService) {
    console.log(Defaults);
  }

  ngOnInit(): void {
    this.componentLoaderService.dynamicComponents.subscribe((data) => {
      this.components = data;
    });
  }

  yearChange() {
    this.componentLoaderService.getYearlyData(parseInt(this.selectedYear));
  }
}
