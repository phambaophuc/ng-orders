import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ListAccountComponent } from './list-account/list-account.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
    declarations: [
        AccountComponent,
        ListAccountComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        NgxPaginationModule,
        SharedModule
    ]
})
export class AccountModule { }
