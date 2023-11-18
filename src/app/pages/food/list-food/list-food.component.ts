import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Food } from 'src/app/common/food';
import { Shop } from 'src/app/common/shop';
import { FoodService } from 'src/app/services/food.service';
import { ShopService } from 'src/app/services/shop.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { EditFoodComponent } from '../edit-food/edit-food.component';
import { OptionDetailsComponent } from './option-details/option-details.component';
import { OptionDialogComponent } from '../add-food/option-dialog/option-dialog.component';
import { Option } from 'src/app/common/option';

@Component({
    selector: 'app-list-food',
    templateUrl: './list-food.component.html',
    styleUrls: ['./list-food.component.scss']
})
export class ListFoodComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['key', 'foodName', 'foodPrice', 'foodType', 'isOutOfStock', 'option', 'shopName', 'actions'];

    dataSource!: MatTableDataSource<any>;

    option: Option = {};

    constructor(
        private foodService: FoodService,
        private shopService: ShopService,
        private _liveAnnouncer: LiveAnnouncer,
        private snackbarSerice: SnackBarService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getAllFoods();
    }

    getAllFoods() {
        this.foodService.getAllFoods().subscribe(
            data => {
                this.shopService.getAllShops().subscribe(shops => {
                    this.dataSource = new MatTableDataSource<Food>(data.map(
                        (food: Food) => {
                            const shop = shops.find((shop: Shop) => shop.key === food.shopId);
                            return { ...food, shopName: shop.shopName };
                        })
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                });
            }
        );
    }

    deleteFood(foodKey: string) {
        const dialogRef = this.dialog.open(ConfirmDeleteComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.foodService.deleteFood(foodKey)
                    .then(() => {
                        this.snackbarSerice.openSnackBar('Sản phẩm đã được xoá!', 'DONE');
                    });
            }
        });
    }

    openEditForm(data: any) {
        this.dialog.open(EditFoodComponent, { data });
    }

    openOptionDetails(data: any) {
        this.dialog.open(OptionDetailsComponent, { data });
    }

    addOption(food: Food) {
        this.option.optionList = [];
        this.foodService.addOptionFood(food, this.option)
            .then(() => {
                this.snackbarSerice.openSnackBar('Thêm Option thành công.');
            })
            .catch(error => {
                console.log(error);
            });
        this.option = {};
    }

    openAddOption(food: Food) {
        const dialogRef = this.dialog.open(OptionDialogComponent, {
            data: { option: this.option },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addOption(food);
            }
        });
    }

    deleteOption(food: Food, option: Option) {
        const dialogRef = this.dialog.open(ConfirmDeleteComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.foodService.deleteOptionFood(food, option)
                    .then(() => {
                        this.snackbarSerice.openSnackBar('Option đã được xoá !', 'DONE');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
