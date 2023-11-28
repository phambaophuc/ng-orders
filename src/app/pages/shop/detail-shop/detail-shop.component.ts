import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/common/shop';
import { ShopService } from 'src/app/services/shop.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
    selector: 'app-detail-shop',
    templateUrl: './detail-shop.component.html',
    styleUrls: ['./detail-shop.component.scss']
})
export class DetailShopComponent implements OnInit {

    shop: Shop = {};
    isEditMode = false;

    constructor(
        private shopService: ShopService,
        private snackbar: SnackBarService
    ) { }

    ngOnInit(): void {
        const shopKey = '-Nk4Zja5I5b-r38MpJ2q';
        this.shopService.getShopByKey(shopKey).subscribe(
            (shop) => {
                this.shop = shop;
            }
        )
    }

    toggleEditMode(shop: Shop) {
        if (this.isEditMode) {
            this.updateShop(shop)
        }
        this.isEditMode = !this.isEditMode;
    }

    updateShop(shop: Shop) {
        this.shopService.updateShop(shop.key!, shop)
            .then(() => {
                this.snackbar.openSnackBar('Cập nhật cửa hàng thành công.');
            })
            .catch(error => {
                console.error(error);
            })
    }

    close() {
        this.isEditMode = !this.isEditMode;
    }
}
