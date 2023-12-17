import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Food } from 'src/app/common/food';
import { Option } from 'src/app/common/option';
import { OptionItem } from 'src/app/common/option-item';
import { FoodService } from 'src/app/services/food.service';
import { AddOptionItemComponent } from '../../add-food/add-option-item/add-option-item.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ConfirmDialogComponent } from 'src/app/theme/shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

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
        private dialog: MatDialog,
        private afStorage: AngularFireStorage,
        private toastr: ToastrService
    ) { }

    deleteOptionItem(food: Food, optionIndex: number, optionItem: OptionItem) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Xoá item?', message: 'Bạn có chắc muốn xoá Item này?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.foodService.deleteOptionItemFood(food, optionIndex, optionItem)
                    .then(() => {
                        this.toastr.error('Item đã được xoá.', 'Đã xoá!');
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
                this.toastr.success('Đã thêm item vào Option.', 'Thành công!');
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
