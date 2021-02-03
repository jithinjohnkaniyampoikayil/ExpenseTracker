import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  public expense = new BehaviorSubject<Expense[]>([]);
  public groupedExpense = new BehaviorSubject<Expense[]>([]);
  constructor(private http: HttpClient) {
    this.getExpenseGrouped();
  }

  getExpenseGrouped() {
    let expense: Expense[] = [];
    this.http
      .get('assets/expense.csv', { responseType: 'text' })
      .pipe(
        map((data) => {
          let csvToRowArray = data.split('\n');
          for (let index = 2; index < csvToRowArray.length; index++) {
            let row = csvToRowArray[index].split(',');
            expense.push(
              new Expense(
                new Date(row[0].split('/').reverse().join('/')),
                row[1],
                row[2],
                parseFloat(row[3])
              )
            );
          }
          this.expense.next(expense);
          var helper = {};
          this.groupedExpense.next(
            expense.reduce(function (r, o) {
              var key = o.category.toString();

              if (!helper[key]) {
                helper[key] = Object.assign({}, o); // create a copy of o
                r.push(helper[key]);
              } else {
                helper[key].amount += o.amount;
              }

              return r;
            }, [])
          );
        })
      )
      .subscribe();
  }

  getGrouped(): Observable<any> {
    return of(this.groupedExpense);
  }
  getFull(): Observable<any> {
    return of(this.expense);
  }
}
