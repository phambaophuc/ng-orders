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

@Component({
    selector: 'app-add-food',
    templateUrl: './add-food.component.html',
    styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {

    food: Food = new Food();

    shops: Shop[] = [];
    selectedShop: string = '';

    options: Option[] = [];
    option: Option = new Option();

    optionItems: OptionItem[] = [];
    optionItem: OptionItem = new OptionItem();

    selectedImage: File | null = null;
    selectedImageSrc: string | null = null;

    constructor(
        private foodService: FoodService,
        private shopService: ShopService,
        private afStorage: AngularFireStorage,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getAllShops();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(OptionDialogComponent, {
            data: { option: this.option },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addOption();
            }
        });
    }

    getAllShops() {
        this.shopService.getAllShops().subscribe(
            data => {
                this.shops = data;
            }
        );
    }

    addFood() {
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

    addOption() {
        this.options.push({
            optionName: this.option?.optionName,
            optionType: this.option?.optionType,
            optionList: this.optionItems
        });

    }

    saveFood() {
        try {
            this.food.shopId = this.selectedShop;
            this.food.options = this.options;
            this.foodService.addFood(this.food);

            alert('Food added successfully.');
            this.resetForm();
        } catch (error) {
            console.log(error);
        }
    }

    onImageSelected(event: any) {
        this.selectedImage = event.target.files[0];
        this.selectedImageSrc = URL.createObjectURL(this.selectedImage!);
    }

    resetForm() {
        this.food = {};
        this.food.options = [];
        this.selectedShop = '';
    }
}
