import { Injectable } from '@angular/core';
import { DynamicLoader } from '../models/dynamicloader';
import { AreaComponent } from '../shared/widget/area/area.component';
import { BarComponent } from '../shared/widget/bar/bar.component';
import { DonutComponent } from '../shared/widget/donut/donut.component';

@Injectable()
export class ComponentLoaderService {
  getComponents() {
    return [
      new DynamicLoader(AreaComponent, [], ''),

      new DynamicLoader(BarComponent, [], ''),

      new DynamicLoader(DonutComponent, [], ''),
    ];
  }
}
