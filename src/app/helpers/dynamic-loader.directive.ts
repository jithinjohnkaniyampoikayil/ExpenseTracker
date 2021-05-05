// tslint:disable: directive-selector
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicHost]',
})
export class DynamicLoaderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
