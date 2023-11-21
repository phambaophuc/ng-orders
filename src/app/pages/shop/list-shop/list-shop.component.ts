import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShopService } from 'src/app/services/shop.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ConfirmDeleteComponent } from '../../food/confirm-delete/confirm-delete.component';

@Component({
    selector: 'app-list-shop',
    templateUrl: './list-shop.component.html',
    styleUrls: ['./list-shop.component.scss']
})
export class ListShopComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = [
        'key', 'shopName', 'shopAddress', 'ratingScore', 'openingTime', 'closingTime', 'isOpening', 'actions'
    ];

    dataSource!: MatTableDataSource<any>;

    constructor(
        private shopService: ShopService,
        private _liveAnnouncer: LiveAnnouncer,
        private snackbarSerice: SnackBarService,
        private dialog: MatDialog,
        private afStorage: AngularFireStorage,
    ) { }

    ngOnInit(): void {
        this.getAllShops();
    }

    getAllShops() {
        this.shopService.getAllShops().subscribe(
            data => {
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        );
    }

    deleteShop(shopKey: string) {
        const dialogRef = this.dialog.open(ConfirmDeleteComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.shopService.deleteShop(shopKey)
                    .then(() => {
                        this.snackbarSerice.openSnackBar('Cửa hàng đã được xoá!', 'DONE');
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
