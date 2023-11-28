import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { AddShopComponent } from './add-shop/add-shop.component';
import { DetailShopComponent } from './detail-shop/detail-shop.component';

const routes: Routes = [
    { path: '', component: ShopComponent },
    { path: 'add', component: AddShopComponent },
    { path: 'details', component: DetailShopComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
