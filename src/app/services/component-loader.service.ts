import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { Defaults } from '../models/defaults';
import { DynamicLoader } from '../models/dynamicloader';
import { AreaStackedComponent } from '../shared/widget/area-stacked/area-stacked.component';
import { AreaComponent } from '../shared/widget/area/area.component';
import { BarComponent } from '../shared/widget/bar/bar.component';
import { DonutComponent } from '../shared/widget/donut/donut.component';
import { ExpenseService } from './expense.service';

@Injectable()
export class ComponentLoaderService {
  private currency: string = Defaults.currency;
  public dynamicComponents = new BehaviorSubject<DynamicLoader[]>([]);
  constructor(private expenseService: ExpenseService) {
    this.getDashboardComponents();
  }
  getYearlyData(year: number) {
    this.expenseService.setExpense(year);
  }

  getDashboardComponents() {
    const grouped = this.expenseService.groupedExpense;
    const categorized = this.expenseService.categorizedExpense;
    combineLatest(grouped, categorized).subscribe(([first, second]) => {
      this.dynamicComponents.next([
        new DynamicLoader(AreaComponent, first, this.currency),

        new DynamicLoader(BarComponent, first, this.currency),

        new DynamicLoader(DonutComponent, first, this.currency),

        new DynamicLoader(AreaStackedComponent, second, this.currency),
      ]);
    });
  }
}
