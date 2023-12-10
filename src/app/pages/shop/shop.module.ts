import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
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
import { AddShopComponent } from './add-shop/add-shop.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListShopComponent } from './list-shop/list-shop.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { AddSectionDialogComponent } from './add-shop/add-section-dialog/add-section-dialog.component';
import { EditShopComponent } from './edit-shop/edit-shop.component';
import { DetailShopComponent } from './detail-shop/detail-shop.component';
import { RegisterShopComponent } from './register-shop/register-shop.component';


@NgModule({
    declarations: [
        ShopComponent,
        AddShopComponent,
        ListShopComponent,
        AddSectionDialogComponent,
        EditShopComponent,
        DetailShopComponent,
        RegisterShopComponent
    ],
    imports: [
        CommonModule,
        ShopRoutingModule,
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
        SharedModule,
        NgxMatTimepickerModule
    ]
})
export class ShopModule { }
