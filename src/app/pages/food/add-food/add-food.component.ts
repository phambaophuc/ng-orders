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
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { AddOptionItemComponent } from './add-option-item/add-option-item.component';
import { Section } from 'src/app/common/section';
import { AuthService } from 'src/app/services/auth.service';

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
    addingFood: boolean = false;

    selectedShopSections?: Section[];

    listType: string[] = ['fastfood', 'drink', 'vietnameseFood', 'koreanFood', 'japaneseFood', 'other'];

    constructor(
        private foodService: FoodService,
        private shopService: ShopService,
        private authService: AuthService,
        private snackbarSerice: SnackBarService,
        private afStorage: AngularFireStorage,
        private fb: FormBuilder,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getAllShops();
        this.getShopId();

        this.addFoodForm = this.fb.group({
            foodName: new FormControl('', [Validators.required]),
            foodType: new FormControl('', [Validators.required]),
            foodPrice: new FormControl('',
                [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]
            ),
            foodDescription: new FormControl(''),
            isOutOfStock: new FormControl(false),
            //shopId: new FormControl('', [Validators.required]),
            sectionId: new FormControl('', [Validators.required])
        });
    }

    get foodName() { return this.addFoodForm.get('foodName') };
    get foodType() { return this.addFoodForm.get('foodType') };
    get foodPrice() { return this.addFoodForm.get('foodPrice') };
    get foodDescription() { return this.addFoodForm.get('foodDescription') };
    get isOutOfStock() { return this.addFoodForm.get('isOutOfStock') };
    //get shopId() { return this.addFoodForm.get('shopId') };
    get sectionId() { return this.addFoodForm.get('sectionId') };

    getAllShops() {
        this.shopService.getAllShops().subscribe(
            data => {
                this.shops = data;
            }
        );
    }

    getShopId() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.shopService.getSectionShop(user.shopId).subscribe(
                    data => {
                        this.selectedShopSections = data;
                        this.sectionId?.setValue(this.selectedShopSections![0].key);
                        this.food.shopId = user.shopId;
                    }
                )
            }
        )
    }

    onSubmit(formDirective: FormGroupDirective) {
        if (this.addFoodForm.valid) {
            this.addingFood = true;

            if (this.selectedImage) {
                const imageRef = this.afStorage.ref(`FoodImage/${this.selectedImage.name}`);
                const uploadTask = imageRef.put(this.selectedImage);

                uploadTask.snapshotChanges().subscribe(
                    (snapshot) => {
                        if (snapshot?.state === 'success') {
                            imageRef.getDownloadURL().subscribe(
                                (downloadUrl) => {
                                    this.food.foodImage = downloadUrl;
                                    this.saveFood(formDirective);
                                }
                            )
                        }
                    }
                )
            } else {
                this.saveFood(formDirective);
            }
        }
    }

    saveFood(formDirective: FormGroupDirective) {
        this.setFoodProperties();

        this.foodService.addFood(this.food).then(() => {
            this.resetForm(formDirective);
            this.addingFood = false;
            this.snackbarSerice.openSnackBar('Thêm sản phẩm thành công');
        }).catch(error => {
            console.log(error);
            this.addingFood = false;
        });
    }

    // onShopSelectionChange() {
    //     const selectedShopId = this.shopId?.value;

    //     this.shopService.getSectionShop(selectedShopId).subscribe(
    //         data => {
    //             this.selectedShopSections = data;
    //             this.sectionId?.setValue(this.selectedShopSections![0].key);
    //         }
    //     )
    // }

    setFoodProperties() {
        this.food.foodName = this.foodName?.value;
        this.food.foodType = this.foodType?.value;
        this.food.foodPrice = this.foodPrice?.value;
        this.food.foodDescription = this.foodDescription?.value;
        this.food.isOutOfStock = this.isOutOfStock?.value;
        this.food.options = this.options;
        //this.food.shopId = this.shopId?.value;
        this.food.sectionId = this.sectionId?.value;
    }

    addOption() {
        this.option.optionList = [];
        this.options.push(this.option);
        this.option = {};
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

    resetForm(formDirective: FormGroupDirective) {
        this.options = [];

        const inputElement: HTMLInputElement | null = document.querySelector('#fileInput');
        if (inputElement) {
            inputElement.value = '';
        }
        this.selectedImage = null;

        formDirective.resetForm();
        this.addFoodForm.reset();
    }

    openAddOption() {
        const dialogRef = this.dialog.open(OptionDialogComponent, {
            data: { option: this.option },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addOption();
            }
        });
    }

    addOptionItem(option: Option) {
        option.optionList?.push(this.optionItem);
        this.optionItem = {};
    }

    deleteOptionItem(option: Option, index: number) {
        if (index >= 0 && index < option.optionList!.length) {
            option.optionList?.splice(index, 1);
        }
    }

    openAddOptionItem(option: Option) {
        const dialogRef = this.dialog.open(AddOptionItemComponent, {
            data: { optionItem: this.optionItem }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.image) {
                    const fileImage = result.image;
                    const imageRef = this.afStorage.ref(`FoodImage/${fileImage.name}`);
                    const uploadTask = imageRef.put(fileImage);

                    uploadTask.snapshotChanges().subscribe(
                        (snapshot) => {
                            if (snapshot?.state === 'success') {
                                imageRef.getDownloadURL().subscribe(
                                    (downloadUrl) => {
                                        this.optionItem.image = downloadUrl;
                                        this.addOptionItem(option);
                                    }
                                )
                            }
                        }
                    )
                } else {
                    this.addOptionItem(option);
                }
            }
        });
    }
}
