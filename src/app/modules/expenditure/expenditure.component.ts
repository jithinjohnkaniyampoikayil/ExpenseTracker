import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, Subject } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';
@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss'],
})
export class ExpenditureComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatPaginator) paginator: QueryList<any>;

  matPaginator = new Subject();
  displayedColumns: string[] = ['date', 'category', 'description', 'amount'];
  groupedExpensesDataSource: any;
  fullExpensesDataSource: any;
  currencySymbol: String = '€';
  selectedYear = '2020';

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getExpense().subscribe((data) => {
      if (data.length == 0) {
        this.expenseService.setExpense(parseInt(this.selectedYear));
      }
    });
    combineLatest([
      this.expenseService.getExpense(),
      this.expenseService.getGroupedExpense(),
    ]).subscribe(([first, second]) => {
      this.groupedExpensesDataSource = new MatTableDataSource(second);
      this.fullExpensesDataSource = new MatTableDataSource(first);
      this.setPagination();
    });
  }

  ngAfterViewInit() {
    this.setPagination();
  }

  setPagination() {
    if (
      this.paginator &&
      this.groupedExpensesDataSource &&
      this.fullExpensesDataSource
    ) {
      let pages = this.paginator.filter((item) => {
        return item;
      });

      this.groupedExpensesDataSource.paginator = pages[0];
      this.fullExpensesDataSource.paginator = pages[1];
    }
  }

  applyFullFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.fullExpensesDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyGroupedFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.groupedExpensesDataSource.filter = filterValue.trim().toLowerCase();
  }
}
