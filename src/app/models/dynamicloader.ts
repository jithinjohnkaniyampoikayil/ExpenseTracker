import { Type } from '@angular/core';

export class DynamicLoader {
  constructor(
    public component: Type<any>,
    public expenses: any,
    public currency: string
  ) {}
}
