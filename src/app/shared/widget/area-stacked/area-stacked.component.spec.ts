import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaStackedComponent } from './area-stacked.component';

describe('AreaStackedComponent', () => {
  let component: AreaStackedComponent;
  let fixture: ComponentFixture<AreaStackedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AreaStackedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaStackedComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   component.expenses = [{ category: 'jhjh' }];
  //   expect(component).toBeTruthy();
  // });
});
