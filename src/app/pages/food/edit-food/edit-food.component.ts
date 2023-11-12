import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shop } from 'src/app/common/shop';
import { FoodService } from 'src/app/services/food.service';
import { ShopService } from 'src/app/services/shop.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
    selector: 'app-edit-food',
    templateUrl: './edit-food.component.html',
    styleUrls: ['./edit-food.component.scss']
})
export class EditFoodComponent implements OnInit {

    editForm: FormGroup = new FormGroup({});

    shops: Shop[] = [];

    selectedImage: File | null = null;
    selectedImageSrc: string | null = null;

    constructor(
        private fb: FormBuilder,
        private afStorage: AngularFireStorage,
        private dialogRef: MatDialogRef<EditFoodComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackbarService: SnackBarService,
        private foodService: FoodService,
        private shopService: ShopService
    ) { }

    ngOnInit(): void {
        this.getAllShops();

        this.editForm = this.fb.group({
            foodName: new FormControl('', [Validators.required]),
            foodType: new FormControl('', [Validators.required]),
            foodPrice: new FormControl('',
                [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]
            ),
            foodDescription: new FormControl(''),
            isOutOfStock: new FormControl(false),
            shopId: new FormControl(this.data.shopId, [Validators.required])
        })

        this.editForm.patchValue(this.data);
    }

    get foodName() { return this.editForm.get('foodName') };
    get foodType() { return this.editForm.get('foodType') };
    get foodPrice() { return this.editForm.get('foodPrice') };
    get foodDescription() { return this.editForm.get('foodDescription') };
    get isOutOfStock() { return this.editForm.get('isOutOfStock') };
    get shopId() { return this.editForm.get('shopId') };

    onSubmit() {
        if (this.editForm.valid) {
            if (this.selectedImage) {
                const imageRef = this.afStorage.ref(`FoodImage/${this.selectedImage.name}`);
                const uploadTask = imageRef.put(this.selectedImage);

                uploadTask.snapshotChanges().subscribe(
                    (snapshot) => {
                        if (snapshot?.state === 'success') {
                            imageRef.getDownloadURL().subscribe(
                                (downloadUrl) => {
                                    this.data.foodImage = downloadUrl;
                                    this.updateFood();
                                }
                            )
                        }
                    }
                )
            } else {
                this.updateFood();
            }
        }
    }

    updateFood() {
        this.foodService.updateFood(this.data.key, this.editForm.value)
            .then(() => {
                this.snackbarService.openSnackBar('Thông tin sản phẩm đã được cập nhật!');
                this.dialogRef.close();
            })
            .catch(error => {
                console.log(error);
            });
    }

    getAllShops() {
        this.shopService.getAllShops().subscribe(
            data => {
                this.shops = data;
            }
        );
    }

    onImageSelected(event: any) {
        this.selectedImage = event.target.files[0];
        this.selectedImageSrc = URL.createObjectURL(this.selectedImage!);
    }
}
