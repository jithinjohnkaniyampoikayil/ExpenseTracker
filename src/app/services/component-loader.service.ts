import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { DynamicLoader } from '../models/dynamicloader';
import { AreaStackedComponent } from '../shared/widget/area-stacked/area-stacked.component';
import { AreaComponent } from '../shared/widget/area/area.component';
import { BarComponent } from '../shared/widget/bar/bar.component';
import { DonutComponent } from '../shared/widget/donut/donut.component';
import { ExpenseService } from './expense.service';

@Injectable()
export class ComponentLoaderService extends ExpenseService {
  private currency: string = 'Euro';
  public dynamicComponents = new BehaviorSubject<DynamicLoader[]>([]);

  getYearlyData(year: number) {
    this.setExpense(year);
  }

  getDashboardComponents(year: number) {
    this.expense.subscribe((data) => {
      if (data.length == 0) {
        this.setExpense(year);
        debugger;
      }
    });

    const grouped = this.groupedExpense;
    const categorized = this.categorizedExpense;
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
