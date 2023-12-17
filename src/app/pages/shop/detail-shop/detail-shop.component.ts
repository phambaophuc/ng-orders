import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/common/section';
import { Shop } from 'src/app/common/shop';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';
import { AddSectionDialogComponent } from '../add-shop/add-section-dialog/add-section-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ConfirmDialogComponent } from 'src/app/theme/shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-detail-shop',
    templateUrl: './detail-shop.component.html',
    styleUrls: ['./detail-shop.component.scss']
})
export class DetailShopComponent implements OnInit {

    shop: Shop = {};
    section: Section = {};

    isEditModeShop = false;
    isEditModeSection = false;
    isLoadData = false;

    selectedImage: File | null = null;
    selectedImageSrc: string | null = null;

    constructor(
        private shopService: ShopService,
        private authService: AuthService,
        private dialog: MatDialog,
        private afStorage: AngularFireStorage,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getShopByUser();
    }

    getShopByUser() {
        this.isLoadData = true;
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.shopService.getShopByKey(user.shopId).subscribe(
                    (shop) => {
                        this.shop = shop;
                        this.isLoadData = false;
                    }
                )
            }
        )
    }

    toggleEditModeShop(shop: Shop) {
        if (this.isEditModeShop) {
            if (this.selectedImage) {
                this.changeImage(shop);
            } else {
                this.updateShop(shop);
            }

        }
        this.isEditModeShop = !this.isEditModeShop;
    }

    updateShop(shop: Shop) {
        this.shopService.updateShop(shop.key!, shop)
            .then(() => {
                this.toastr.info('Thông tin cửa hàng đã được cập nhật', 'Cập nhật thành công!');
            })
            .catch(error => {
                console.error(error);
            })
    }

    addSection(shop: Shop) {
        this.shopService.addSectionShop(shop, this.section)
            .then(() => {
                this.toastr.success('Đã thêm phần ăn cho cửa hàng.', 'Thêm thành công!');
            })
            .catch(error => {
                console.log(error);
            });
        this.section = {};
    }

    openAddSection(shop: Shop) {
        const dialogRef = this.dialog.open(AddSectionDialogComponent, {
            data: { section: this.section },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addSection(shop);
            }
        });
    }

    deleteSection(shop: Shop, section: Section) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Xoá Section?', message: 'Bạn có chắc muốn xoá Section này?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.shopService.deleteSectionShop(shop, section)
                    .then(() => {
                        this.toastr.error('Phần ăn đã được xoá.', 'Đã xoá!');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    }

    toggleEditModeSection() {
        this.isEditModeSection = !this.isEditModeSection;
    }

    close() {
        this.isEditModeShop = !this.isEditModeShop;
        this.selectedImage = null;
    }

    onImageSelected(event: any) {
        this.selectedImage = event.target.files[0];
        this.selectedImageSrc = URL.createObjectURL(this.selectedImage!);
    }

    changeImage(shop: Shop) {
        const imageRef = this.afStorage.ref(`ShopImage/${this.selectedImage?.name}`);
        const uploadTask = imageRef.put(this.selectedImage);

        uploadTask.snapshotChanges().subscribe(
            (snapshot) => {
                if (snapshot?.state === 'success') {
                    imageRef.getDownloadURL().subscribe(
                        (downloadUrl) => {
                            this.shop.shopImage = downloadUrl;
                            this.updateShop(shop);
                        }
                    )
                }
            }
        )
    }
}
