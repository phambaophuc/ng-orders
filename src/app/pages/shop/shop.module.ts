import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddShopComponent } from './add-shop/add-shop.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
    declarations: [
        ShopComponent,
        AddShopComponent
    ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        SharedModule
    ]
})
export class ShopModule { }
