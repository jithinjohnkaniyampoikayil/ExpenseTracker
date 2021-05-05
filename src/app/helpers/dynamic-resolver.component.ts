import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
} from '@angular/core';
import { DynamicLoader } from '../models/dynamicloader';
import { DynamicLoaderDirective } from './dynamic-loader.directive';

@Component({
  selector: 'dynamic-resolver',
  template: ` <ng-template dynamicHost></ng-template> `,
})
export class DynamicResolverComponent implements OnInit, OnDestroy {
  @Input() components: DynamicLoader;
  @ViewChild(DynamicLoaderDirective, { static: true })
  adHost: DynamicLoaderDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loadComponent();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.components.component
    );

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<any>(
      componentFactory
    );
    componentRef.instance.data = this.components;
  }
}
