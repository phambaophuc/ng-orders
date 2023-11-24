import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Section } from 'src/app/common/section';
import { Shop } from 'src/app/common/shop';
import { ShopService } from 'src/app/services/shop.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { AddSectionDialogComponent } from './add-section-dialog/add-section-dialog.component';

@Component({
    selector: 'app-add-shop',
    templateUrl: './add-shop.component.html',
    styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit {

    addShopForm: FormGroup = new FormGroup({});

    shop: Shop = new Shop();
    addingShop: boolean = false;

    section: Section = new Section();
    sections: Section[] = [];

    selectedImage: File | null = null;
    selectedImageSrc: string | null = null;

    constructor(
        private shopService: ShopService,
        private snackbarSerice: SnackBarService,
        private afStorage: AngularFireStorage,
        private fb: FormBuilder,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.addShopForm = this.fb.group({
            shopName: new FormControl('', [Validators.required]),
            shopAddress: new FormControl('', [Validators.required]),
            openingTime: new FormControl('07:00', [Validators.required]),
            closingTime: new FormControl('16:00', [Validators.required]),
            isOpening: new FormControl(true)
        });
    }

    get shopName() { return this.addShopForm.get('shopName') };
    get shopAddress() { return this.addShopForm.get('shopAddress') };
    get openingTime() { return this.addShopForm.get('openingTime') };
    get closingTime() { return this.addShopForm.get('closingTime') };
    get isOpening() { return this.addShopForm.get('isOpening') };

    onSubmit(formDirective: FormGroupDirective) {
        if (this.addShopForm.valid) {
            this.addingShop = true;

            if (this.selectedImage) {
                const imageRef = this.afStorage.ref(`ShopImage/${this.selectedImage.name}`);
                const uploadTask = imageRef.put(this.selectedImage);

                uploadTask.snapshotChanges().subscribe(
                    (snapshot) => {
                        if (snapshot?.state === 'success') {
                            imageRef.getDownloadURL().subscribe(
                                (downloadUrl) => {
                                    this.shop.shopImage = downloadUrl;
                                    this.saveShop(formDirective);
                                }
                            )
                        }
                    }
                )
            } else {
                this.saveShop(formDirective);
            }
        }
    }

    saveShop(formDirective: FormGroupDirective) {
        this.setShopProperties();

        this.shopService.addShop(this.shop).then(() => {
            this.resetForm(formDirective);
            this.addingShop = false;
            this.snackbarSerice.openSnackBar('Thêm cửa hàng thành công');
        }).catch(error => {
            console.log(error);
            this.addingShop = false;
        })
    }

    setShopProperties() {
        this.shop.shopName = this.shopName?.value;
        this.shop.shopAddress = this.shopAddress?.value;
        this.shop.openingTime = this.openingTime?.value;
        this.shop.closingTime = this.closingTime?.value;
        this.shop.isOpening = this.isOpening?.value;
        this.shop.sections = this.sections;
    }

    addSection() {
        this.sections.push(this.section);
        this.section = {};
    }

    deleteSection(index: number) {
        if (index >= 0 && index < this.sections.length) {
            this.sections.splice(index, 1);
        }
    }

    openAddSection() {
        const dialogRef = this.dialog.open(AddSectionDialogComponent, {
            data: { section: this.section },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addSection();
            }
        });
    }

    resetForm(formDirective: FormGroupDirective) {
        this.shop = new Shop();

        const inputElement: HTMLInputElement | null = document.querySelector('#fileInput');
        if (inputElement) {
            inputElement.value = '';
        }
        this.selectedImage = null;

        formDirective.resetForm();
        this.addShopForm.reset({
            openingTime: '07:00',
            closingTime: '16:00',
            isOpening: true
        });
    }

    onImageSelected(event: any) {
        this.selectedImage = event.target.files[0];
        this.selectedImageSrc = URL.createObjectURL(this.selectedImage!);
    }
}
