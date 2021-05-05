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
  constructor(
    private expenseService: ExpenseService,
    private componentLoaderService: ComponentLoaderService
  ) {
    this.loadData();
  }

  loadData() {}

  ngOnInit(): void {
    this.components = this.componentLoaderService.getComponents();
    this.expenseService.groupedExpense.subscribe((data) => {
      for (let items of this.components) {
        if (data.length > 0) {
          items.expenses = data;
          items.currency = this.currency;
        }
      }
    });
  }
}
