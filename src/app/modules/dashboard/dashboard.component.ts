import { Component, OnInit } from '@angular/core';
import { DynamicLoader } from 'src/app/models/dynamicloader';
import { ComponentLoaderService } from 'src/app/services/component-loader.service';

import { ExpenseService } from '../../services/expense.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currency: string = 'Euro';
  components: DynamicLoader[];
  selected = '2020';
  constructor(private componentLoaderService: ComponentLoaderService) {}

  ngOnInit(): void {
    this.componentLoaderService.getDashboardComponents(parseInt(this.selected));
    this.componentLoaderService.dynamicComponents.subscribe((data) => {
      this.components = data;
    });
  }

  yearChange() {
    this.componentLoaderService.getYearlyData(parseInt(this.selected));
  }
}
