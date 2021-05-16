import { Component, OnInit } from '@angular/core';
import { Defaults } from 'src/app/models/defaults';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  sidebarOpen = true;
  constructor(private expenseService: ExpenseService) {
    this.expenseService.setExpense(parseInt(Defaults.year));
  }
  ngOnInit(): void {}
  sidebarToggle() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
