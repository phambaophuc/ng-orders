import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Food } from 'src/app/common/food';
import { Option } from 'src/app/common/option';
import { OptionItem } from 'src/app/common/option-item';
import { FoodService } from 'src/app/services/food.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { AddOptionItemComponent } from '../../add-food/add-option-item/add-option-item.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
    selector: 'app-option-details',
    templateUrl: './option-details.component.html',
    styleUrls: ['./option-details.component.scss']
})
export class OptionDetailsComponent {

    optionItem: OptionItem = {};

    addingSuccess: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { food: Food, option: Option, index: number },
        private foodService: FoodService,
        private snackbarService: SnackBarService,
        private dialog: MatDialog,
        private afStorage: AngularFireStorage,
        private snackbarSerice: SnackBarService
    ) { }

    deleteOptionItem(food: Food, optionIndex: number, optionItem: OptionItem) {
        const dialogRef = this.dialog.open(ConfirmDeleteComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.foodService.deleteOptionItemFood(food, optionIndex, optionItem)
                    .then(() => {
                        this.snackbarService.openSnackBar('Item đã được delete!', 'DONE');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    }

    addOptionItem(food: Food, optionIndex: number) {
        this.foodService.AddOptionItemFood(food, optionIndex, this.optionItem)
            .then(() => {
                this.addingSuccess = false;
                this.snackbarSerice.openSnackBar('Thêm item vào Option thành công.');
                this.optionItem = {};
            })
            .catch(error => {
                this.addingSuccess = false;
                console.log(error);
            });
    }

    openAddOptionItem(food: Food, optionIndex: number) {
        const dialogRef = this.dialog.open(AddOptionItemComponent, {
            data: { optionItem: this.optionItem }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addingSuccess = true;
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
                                        this.addOptionItem(food, optionIndex);
                                    }
                                )
                            }
                        }
                    )
                } else {
                    this.addOptionItem(food, optionIndex);
                }
            }
        });
    }
}
