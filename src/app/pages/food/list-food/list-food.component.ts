import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Food } from 'src/app/common/food';
import { FoodService } from 'src/app/services/food.service';
import { EditFoodComponent } from '../edit-food/edit-food.component';
import { OptionDetailsComponent } from './option-details/option-details.component';
import { OptionDialogComponent } from '../add-food/option-dialog/option-dialog.component';
import { Option } from 'src/app/common/option';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmDialogComponent } from 'src/app/theme/shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
    selector: 'app-list-food',
    templateUrl: './list-food.component.html',
    styleUrls: ['./list-food.component.scss']
})
export class ListFoodComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    //displayedColumns: string[] = ['key', 'foodName', 'foodPrice', 'foodType', 'options', 'shopName', 'isOutOfStock', 'actions'];
    displayedColumns: string[] = ['key', 'foodName', 'foodPrice', 'foodType', 'options', 'isOutOfStock', 'actions'];

    dataSource!: MatTableDataSource<any>;

    option: Option = {};
    addingSuccess: boolean = false;

    isLoading: boolean = false;
    shopId?: string;

    constructor(
        private foodService: FoodService,
        private authService: AuthService,
        private excelService: ExcelService,
        private _liveAnnouncer: LiveAnnouncer,
        private toastr: ToastrService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getAllFoods();
    }

    // getAllFoods() {
    //     this.foodService.getAllFoods().subscribe(foods => {
    //         this.shopService.getAllShops().subscribe(shops => {
    //             this.dataSource = new MatTableDataSource<Food>(foods.map(
    //                 (food: Food) => {
    //                     const shop = shops.find((shop: Shop) => shop.key === food.shopId);

    //                     return { ...food, shopName: shop.shopName };
    //                 })
    //             );
    //             this.dataSource.paginator = this.paginator;
    //             this.dataSource.sort = this.sort;
    //         });
    //     });
    // }

    getAllFoods() {
        this.isLoading = true;
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.shopId = user.shopId;
                this.foodService.getFoodsByShopId(user.shopId)
                    .subscribe(data => {
                        this.dataSource = new MatTableDataSource(data);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                        this.isLoading = false;
                    });
            }
        );
    }

    deleteFood(foodKey: string) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Xoá Sản phẩm?', message: 'Bạn có chắc muốn xoá Sản phẩm này?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.foodService.deleteFood(foodKey)
                    .then(() => {
                        this.toastr.error('Sản phẩm đã được xoá.', 'Đã xoá!');
                    });
            }
        });
    }

    openEditForm(data: any) {
        this.dialog.open(EditFoodComponent, { data });
    }

    openOptionDetails(food: Food, option: Option, index: number) {
        this.dialog.open(OptionDetailsComponent, {
            data: {
                food: food,
                option: option,
                index: index
            }
        });
    }

    addOption(food: Food) {
        this.option.optionList = [];
        this.foodService.addOptionFood(food, this.option)
            .then(() => {
                this.toastr.success('Thêm Option thành công.', 'Thành công!');
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
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Xoá Option?', message: 'Bạn có chắc muốn xoá Option này?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.foodService.deleteOptionFood(food, option)
                    .then(() => {
                        this.toastr.error('Option đã được xoá.', 'Đã xoá!');
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

    // Thêm dữ liệu food từ excel
    onFileChange(event: any) {
        const file = event.target.files[0];

        if (file) {
            this.excelService.readFileDataFood(file).then((data: any[]) => {
                const processedData = data.map(
                    item => ({
                        ...item,
                        shopId: String(item.shopId),
                        sectionId: String(item.sectionId)
                    })
                );
                this.foodService.addFoodsFromExcel(processedData);
            });
        }
    }

    openFileInput() {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.click();
    }

    // Tải file ví dụ
    downloadSampleDataFoodExcel() {
        if (this.shopId) {
            this.excelService.downloadSampleDataFoodExcel(this.shopId);
        }
    }
}
