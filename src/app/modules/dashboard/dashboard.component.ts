import { Component, OnInit } from '@angular/core';

import { ExpenseService } from '../../services/expense.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  expenses: any;
  currency: string = 'Euro';
  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.groupedExpense.subscribe((data) => {
      if (data.length > 0) this.expenses = data;
    });
  }
}
