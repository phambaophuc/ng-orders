import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/common/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { DetailOrderComponent } from '../detail-order/detail-order.component';

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['name', 'address', 'dateScheduled', 'timeScheduled', 'payment', 'status', 'actions'];

    dataSource!: MatTableDataSource<any>;

    orders: Order[] = [];

    isLoading: boolean = false;

    constructor(
        private orderService: OrderService,
        private authService: AuthService,
        private _liveAnnouncer: LiveAnnouncer,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getOrders();
    }

    getOrders() {
        this.isLoading = true;
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.orderService.getOrdersByShopId(user.shopId)
                    .subscribe(orders => {
                        this.dataSource = new MatTableDataSource(orders);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                        this.isLoading = false;
                    })
            }
        )
    }

    openOrderDetails(data: any) {
        this.dialog.open(DetailOrderComponent, { data });
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
