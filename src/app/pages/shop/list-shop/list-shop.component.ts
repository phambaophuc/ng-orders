import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShopService } from 'src/app/services/shop.service';
import { Section } from 'src/app/common/section';
import { Shop } from 'src/app/common/shop';
import { AddSectionDialogComponent } from '../add-shop/add-section-dialog/add-section-dialog.component';
import { EditShopComponent } from '../edit-shop/edit-shop.component';
import { ConfirmDialogComponent } from 'src/app/theme/shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-list-shop',
    templateUrl: './list-shop.component.html',
    styleUrls: ['./list-shop.component.scss']
})
export class ListShopComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = [
        'key', 'shopName', 'sections', 'shopAddress', 'ratingScore', 'openingTime', 'closingTime', 'isOpening', 'actions'
    ];

    dataSource!: MatTableDataSource<any>;

    section: Section = {};

    constructor(
        private shopService: ShopService,
        private _liveAnnouncer: LiveAnnouncer,
        private dialog: MatDialog,
        private toastr: ToastrService
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
        const dialogRef = this.dialog.open(ConfirmDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.shopService.deleteShop(shopKey)
                    .then(() => {
                        this.toastr.error('Cửa hàng đã được xoá.', 'Đã xoá!');
                    });
            }
        });
    }

    openEditForm(data: any) {
        this.dialog.open(EditShopComponent, { data });
    }

    addSection(shop: Shop) {
        this.shopService.addSectionShop(shop, this.section)
            .then(() => {
                this.toastr.success('Section đã được thêm.', 'Thêm thành công!');
            })
            .catch(error => {
                console.log(error);
            });
        this.section = {};
    }

    openAddSection(shop: Shop) {
        const dialogRef = this.dialog.open(AddSectionDialogComponent, {
            data: { section: this.section },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addSection(shop);
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
