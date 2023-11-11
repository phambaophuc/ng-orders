import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { AddShopComponent } from './add-shop/add-shop.component';

const routes: Routes = [
    { path: '', component: ShopComponent },
    { path: 'add', component: AddShopComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
