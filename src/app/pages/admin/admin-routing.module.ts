import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { MessageAdminComponent } from './message-admin/message-admin.component';

const routes: Routes = [
    { path: 'account', component: AccountComponent },
    { path: 'messages', component: MessageAdminComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
