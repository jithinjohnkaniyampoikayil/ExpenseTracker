import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ExpenditureComponent } from 'src/app/modules/expenditure/expenditure.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicResolverComponent } from 'src/app/helpers/dynamic-resolver.component';
import { DynamicLoaderDirective } from 'src/app/helpers/dynamic-loader.directive';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ExpenseService } from 'src/app/services/expense.service';
@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ExpenditureComponent,
    DynamicResolverComponent,
    DynamicLoaderDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatTabsModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports: [],
  providers: [],
})
export class DefaultModule {}
