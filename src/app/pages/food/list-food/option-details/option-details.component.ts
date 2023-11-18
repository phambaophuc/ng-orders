import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Food } from 'src/app/common/food';
import { Option } from 'src/app/common/option';
import { OptionItem } from 'src/app/common/option-item';
import { FoodService } from 'src/app/services/food.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

@Component({
    selector: 'app-option-details',
    templateUrl: './option-details.component.html',
    styleUrls: ['./option-details.component.scss']
})
export class OptionDetailsComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { food: Food, option: Option, index: number },
        private foodService: FoodService,
        private snackbarService: SnackBarService,
        private dialog: MatDialog,
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
}
