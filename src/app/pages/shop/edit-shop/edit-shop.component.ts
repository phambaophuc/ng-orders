import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShopService } from 'src/app/services/shop.service';

@Component({
    selector: 'app-edit-shop',
    templateUrl: './edit-shop.component.html',
    styleUrls: ['./edit-shop.component.scss']
})
export class EditShopComponent implements OnInit {

    editForm: FormGroup = new FormGroup({});

    selectedImage: File | null = null;
    selectedImageSrc: string | null = null;

    addingShop: boolean = false;

    constructor(
        private fb: FormBuilder,
        private afStorage: AngularFireStorage,
        private dialogRef: MatDialogRef<EditShopComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private shopService: ShopService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.editForm = this.fb.group({
            shopName: new FormControl('', [Validators.required]),
            shopAddress: new FormControl('', [Validators.required]),
            openingTime: new FormControl('', [Validators.required]),
            closingTime: new FormControl('', [Validators.required]),
            isOpening: new FormControl(true)
        });

        this.editForm.patchValue(this.data);
    }

    get shopName() { return this.editForm.get('shopName') };
    get shopAddress() { return this.editForm.get('shopAddress') };
    get openingTime() { return this.editForm.get('openingTime') };
    get closingTime() { return this.editForm.get('closingTime') };
    get isOpening() { return this.editForm.get('isOpening') };

    onSubmit() {
        this.addingShop = true;

        if (this.editForm.valid) {
            if (this.selectedImage) {
                const imageRef = this.afStorage.ref(`ShopImage/${this.selectedImage.name}`);
                const uploadTask = imageRef.put(this.selectedImage);

                uploadTask.snapshotChanges().subscribe(
                    (snapshot) => {
                        if (snapshot?.state === 'success') {
                            imageRef.getDownloadURL().subscribe(
                                (downloadUrl) => {
                                    this.editForm.value.shopImage = downloadUrl;
                                    this.updateShop();
                                }
                            )
                        }
                    }
                )
            } else {
                this.updateShop();
            }
        }
    }

    updateShop() {
        this.shopService.updateShop(this.data.key, this.editForm.value)
            .then(() => {
                this.toastr.info('Thông tin cửa hàng đã được cập nhật.', 'Cập nhật thành công!');
                this.dialogRef.close();
                this.addingShop = false;
            })
            .catch(error => {
                console.log(error);
                this.addingShop = false;
            });
    }

    onImageSelected(event: any) {
        this.selectedImage = event.target.files[0];
        this.selectedImageSrc = URL.createObjectURL(this.selectedImage!);
    }
}
