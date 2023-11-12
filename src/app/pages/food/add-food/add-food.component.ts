import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { Food } from 'src/app/common/food';
import { Option } from 'src/app/common/option';
import { OptionItem } from 'src/app/common/option-item';
import { Shop } from 'src/app/common/shop';
import { FoodService } from 'src/app/services/food.service';
import { ShopService } from 'src/app/services/shop.service';
import { OptionDialogComponent } from './option-dialog/option-dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
    selector: 'app-add-food',
    templateUrl: './add-food.component.html',
    styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {

    food: Food = new Food();

    shops: Shop[] = [];

    options: Option[] = [];
    option: Option = new Option();

    optionItems: OptionItem[] = [];
    optionItem: OptionItem = new OptionItem();

    selectedImage: File | null = null;
    selectedImageSrc: string | null = null;

    addFoodForm: FormGroup = new FormGroup({});

    constructor(
        private foodService: FoodService,
        private shopService: ShopService,
        private snackbarSerice: SnackBarService,
        private afStorage: AngularFireStorage,
        private fb: FormBuilder,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getAllShops();

        this.addFoodForm = this.fb.group({
            foodName: new FormControl('', [Validators.required]),
            foodType: new FormControl('', [Validators.required]),
            foodPrice: new FormControl('',
                [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]
            ),
            foodDescription: new FormControl(''),
            isOutOfStock: new FormControl(false),
            selectedShop: new FormControl('', [Validators.required])
        })
    }

    get foodName() { return this.addFoodForm.get('foodName') };
    get foodType() { return this.addFoodForm.get('foodType') };
    get foodPrice() { return this.addFoodForm.get('foodPrice') };
    get foodDescription() { return this.addFoodForm.get('foodDescription') };
    get isOutOfStock() { return this.addFoodForm.get('isOutOfStock') };
    get selectedShop() { return this.addFoodForm.get('selectedShop') };

    getAllShops() {
        this.shopService.getAllShops().subscribe(
            data => {
                this.shops = data;
            }
        );
    }

    onSubmit() {
        if (this.selectedImage) {
            const imageRef = this.afStorage.ref(`FoodImage/${this.selectedImage.name}`);
            const uploadTask = imageRef.put(this.selectedImage);

            uploadTask.snapshotChanges().subscribe(
                (snapshot) => {
                    if (snapshot?.state === 'success') {
                        imageRef.getDownloadURL().subscribe(
                            (downloadUrl) => {
                                this.food.foodImage = downloadUrl;
                                this.saveFood();
                            }
                        )
                    }
                }
            )
        } else {
            this.saveFood();
        }
    }

    saveFood() {
        this.setFoodProperties();

        this.foodService.addFood(this.food).then(() => {
            this.snackbarSerice.openSnackBar('Thêm sản phẩm thành công');
            this.resetForm();
        }).catch(error => {
            console.log(error);
        });
    }

    setFoodProperties(): void {
        this.food.foodName = this.addFoodForm.get('foodName')?.value;
        this.food.foodType = this.addFoodForm.get('foodType')?.value;
        this.food.foodPrice = this.addFoodForm.get('foodPrice')?.value;
        this.food.foodDescription = this.addFoodForm.get('foodDescription')?.value;
        this.food.isOutOfStock = this.addFoodForm.get('isOutOfStock')?.value;
        this.food.options = this.options;
        this.food.shopId = this.addFoodForm.get('selectedShop')?.value;
    }

    addOption() {
        this.options.push({
            optionName: this.option?.optionName,
            optionType: this.option?.optionType,
            optionList: this.optionItems
        });

    }

    deleteOption(index: number) {
        if (index >= 0 && index < this.options.length) {
            this.options.splice(index, 1);
        }
    }

    onImageSelected(event: any) {
        this.selectedImage = event.target.files[0];
        this.selectedImageSrc = URL.createObjectURL(this.selectedImage!);
    }

    resetForm() {
        this.addFoodForm.reset();
        this.options = [];
    }

    openDialog() {
        const dialogRef = this.dialog.open(OptionDialogComponent, {
            data: { option: this.option },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addOption();
            }
        });
    }
}
