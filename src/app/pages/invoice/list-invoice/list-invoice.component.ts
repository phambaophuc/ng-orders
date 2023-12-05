import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from 'src/app/common/invoice';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { DetailOrderComponent } from '../../order/detail-order/detail-order.component';
import { MatDialog } from '@angular/material/dialog';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
    selector: 'app-list-invoice',
    templateUrl: './list-invoice.component.html',
    styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = [
        'name', 'phone', 'address', 'totalPrice', 'createdDate', 'details'
    ];

    dataSource!: MatTableDataSource<any>;

    invoices: Invoice[] = [];
    isLoading: boolean = false;

    constructor(
        private authService: AuthService,
        private _liveAnnouncer: LiveAnnouncer,
        private invoiceService: InvoiceService,
        private excelService: ExcelService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getAllInvoices();
    }

    exportToExcel(): void {
        console.log(this.invoices);
        this.excelService.exportToExcel(this.invoices, 'invoices');
    }

    getAllInvoices() {
        this.isLoading = true;
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.invoiceService.getInvoicesByShopId(user.shopId)
                    .subscribe(invoices => {
                        this.invoices = invoices;
                        this.dataSource = new MatTableDataSource(invoices);
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
        this.dataSource.filter = value.trim().toLowerCase();
    }
}
