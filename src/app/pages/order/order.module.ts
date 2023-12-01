import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { OrderComponent } from './order.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { DetailOrderComponent } from './detail-order/detail-order.component';


@NgModule({
    declarations: [
        OrderComponent,
        ListOrderComponent,
        DetailOrderComponent
    ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        SharedModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
    ]
})
export class OrderModule { }
