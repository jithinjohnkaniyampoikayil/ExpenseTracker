import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  public fetchedExpense: Expense[] = [];
  public expense = new BehaviorSubject<Expense[]>([]);
  public groupedExpense = new BehaviorSubject<Expense[]>([]);
  public categorizedExpense = new BehaviorSubject<any>([]);
  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  constructor(private http: HttpClient) {}

  getExpense() {
    return this.expense.asObservable();
  }
  setExpense(year: number) {
    this.http
      .get('assets/expense.csv', { responseType: 'text' })
      .pipe(
        map((data) => {
          let csvToRowArray = data.split('\n');
          for (let index = 2; index < csvToRowArray.length; index++) {
            let row = csvToRowArray[index].split(',');
            this.fetchedExpense.push(
              new Expense(
                new Date(row[0].split('/').reverse().join('/')),
                row[1],
                row[2],
                parseFloat(row[3])
              )
            );
          }
          this.expense.next(this.fetchedExpense);
        })
      )
      .subscribe(() => {
        this.setGroupedExpense();
        this.setCategorizedExpense(year);
      });
  }

  getGroupedExpense() {
    return this.groupedExpense.asObservable();
  }
  setGroupedExpense() {
    var helper = {};
    this.groupedExpense.next(
      this.fetchedExpense.reduce(function (r, o) {
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
  }
  getCategorizedExpense() {
    return this.categorizedExpense.asObservable();
  }
  setCategorizedExpense(year: number) {
    var response = {};
    this.fetchedExpense.forEach((d: any) => {
      const { date, category, amount } = d;
      if (date.getFullYear() == year) {
        var _ = date.toISOString().split('-');
        var month = _[1];
        if (!response[category]) response[category] = { total: 0 };
        response[category][this.months[parseInt(month) - 1]] = response[
          category
        ][this.months[parseInt(month) - 1]]
          ? response[category][this.months[parseInt(month) - 1]] + amount
          : amount;
        response[category].total += amount;
      }
    });
    let finalResponse = [];
    for (let i = 0; i < Object.getOwnPropertyNames(response).length; i++) {
      const {
        January = 0,
        February = 0,
        March = 0,
        April = 0,
        May = 0,
        June = 0,
        July = 0,
        August = 0,
        September = 0,
        October = 0,
        November = 0,
        December = 0,
      } = response[Object.getOwnPropertyNames(response)[i]];
      finalResponse.push({
        name: Object.getOwnPropertyNames(response)[i],
        data: [
          January,
          February,
          March,
          April,
          May,
          June,
          July,
          August,
          September,
          October,
          November,
          December,
        ],
      });
    }
    this.categorizedExpense.next(finalResponse);
  }
}
