import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MessageAdminComponent } from './message-admin/message-admin.component';
import { AccountComponent } from './account/account.component';
import { ListAccountComponent } from './account/list-account/list-account.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
    declarations: [
        AccountComponent,
        ListAccountComponent,
        MessageAdminComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AdminRoutingModule,
        NgxPaginationModule
    ]
})
export class AdminModule { }
