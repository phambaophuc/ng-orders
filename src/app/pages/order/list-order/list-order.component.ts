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
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Status } from 'src/app/common/status.enum';
import { DatePipe } from '@angular/common';
import { Payment } from 'src/app/common/payment.enum';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = [
        'key',
        'name',
        'phone',
        'address',
        'dateScheduled',
        'timeScheduled',
        'isScheduled',
        'payment',
        'status',
        'acceptedTime',
        'acceptedDate',
        'accept',
        'actions'
    ];

    dataSource!: MatTableDataSource<any>;

    orders: Order[] = [];
    isLoading: boolean = false;

    filteredData: any[] = [];
    selectedStatus: string = '';

    constructor(
        private orderService: OrderService,
        private authService: AuthService,
        private _liveAnnouncer: LiveAnnouncer,
        private dialog: MatDialog,
        private snackbar: SnackBarService,
        private datePipe: DatePipe
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

    filterChange(data: Event) {
        const value = (data.target as HTMLInputElement).value;
        this.applyFilter(value);
    }

    selectChange(event: MatSelectChange): void {
        this.selectedStatus = event.value;
        this.applyFilter(this.selectedStatus);
    }

    applyFilter(filterValue: string = ''): void {
        this.dataSource.filter = filterValue;
    }

    acceptOrder(order: Order) {
        order.status = Status.ACCEPTED;

        const currentTime = this.datePipe.transform(new Date(), 'HH:mm');
        const currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');

        order.acceptedTime = currentTime!;
        order.acceptedDate = currentDate!;

        this.orderService.updateOrder(order.key!, order)
            .then(() => {
                this.snackbar.openSnackBar('Đã xác nhận đơn hàng.');
            })
            .catch(error => {
                console.error(error);
            })
    }

    deniedOrder(order: Order) {
        order.status = Status.DENIED;
        this.orderService.updateOrder(order.key!, order)
            .then(() => {
                this.snackbar.openSnackBar('Đơn hàng đã bị huỷ.', 'DONE');
            })
            .catch(error => {
                console.error(error);
            })
    }

    deliveringOrder(order: Order) {
        order.status = Status.DELIVERING;
        this.orderService.updateOrder(order.key!, order)
            .then(() => {
                this.snackbar.openSnackBar('Đơn hàng đã được giao!', 'DONE');
            })
            .catch(error => {
                console.error(error);
            })
    }

    getStatusClass(status: Status): string {
        switch (status) {
            case Status.PENDING:
                return 'text-info';
            case Status.ACCEPTED:
                return 'text-primary';
            case Status.DENIED:
                return 'text-danger';
            case Status.DELIVERING:
                return 'text-warning pulsating-text';
            case Status.COMPLETED:
                return 'text-green';
            default:
                return '';
        }
    }

    getStatusIcon(status: Status): string {
        switch (status) {
            case Status.PENDING:
                return 'fa-hourglass-half rotating-icon';
            case Status.ACCEPTED:
                return 'fa-check-circle';
            case Status.DENIED:
                return 'fa-times-circle';
            case Status.DELIVERING:
                return 'fa-truck';
            case Status.COMPLETED:
                return 'fa-check';
            default:
                return '';
        }
    }

    getPaymentIcon(payment: Payment): string {
        switch (payment) {
            case Payment.CASH:
                return 'fa-money-bill';
            case Payment.ONLINE:
                return 'fa-credit-card';
            default:
                return '';
        }
    }

    getStatusTranslation(status: string): string {
        const translations: StatusTranslations = {
            'pending': 'Chờ xác nhận',
            'accepted': 'Đã xác nhận',
            'denied': 'Đã từ chối',
            'delivering': 'Đang giao',
            'completed': 'Đã hoàn thành'
        };

        return translations[status.toLowerCase()] || status;
    }
}

interface StatusTranslations {
    pending: string;
    accepted: string;
    denied: string;
    delivering: string;
    completed: string;
    [key: string]: string;
}