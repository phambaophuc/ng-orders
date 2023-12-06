import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Invoice } from '../common/invoice';
import { Observable, map } from 'rxjs';
import { isThisMonth } from 'date-fns';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    private invoiceRef: AngularFireList<Invoice>;

    constructor(private db: AngularFireDatabase) {
        this.invoiceRef = db.list('Invoices');
    }

    getInvoicesByShopId(shopId: string): Observable<any[]> {
        return this.db.list('Invoices', ref => ref.orderByChild('shopId').equalTo(shopId))
            .snapshotChanges()
            .pipe(map(changes => changes.map(c => {
                const data = c.payload.val();
                const key = c.payload.key;
                return { key, ...(data ? data : {}) };
            })));
    }

    getInvoicesThisMonth(shopId: string): Observable<Invoice[]> {
        return this.getInvoicesByShopId(shopId).pipe(
            map((invoices) => invoices.filter((invoice) => this.isInvoiceInThisMonth(invoice)))
        );
    }

    private isInvoiceInThisMonth(invoice: Invoice): boolean {
        const createdDate = this.convertStringToDate(invoice.createdDate!);
        return isThisMonth(createdDate);
    }

    calculateTotalRevenueInRange(invoices: Invoice[], startDate: Date, endDate: Date): Map<string, number> {
        const revenuePerDay = new Map<string, number>();

        // Tạo một danh sách các ngày trong khoảng thời gian được chọn
        const dateRange: Date[] = this.getDateRange(startDate, endDate);

        // Khởi tạo giá trị ban đầu cho tất cả các ngày
        dateRange.forEach(date => {
            revenuePerDay.set(this.formatDate(date), 0);
        });

        // Tính toán doanh thu từ các hóa đơn
        invoices.forEach((invoice) => {
            if (invoice.createdDate && invoice.totalPrice !== undefined) {
                const date = this.convertStringToDate(invoice.createdDate);
                const formattedDate = this.formatDate(date);

                // Kiểm tra xem ngày có trong khoảng thời gian không
                if (date >= startDate && date <= endDate) {
                    revenuePerDay.set(formattedDate, revenuePerDay.get(formattedDate)! + invoice.totalPrice);
                }
            }
        });

        return revenuePerDay;
    }

    calculateTotalRevenuePerDay(invoices: Invoice[]): Map<string, number> {
        const revenuePerDay = new Map<string, number>();

        invoices.forEach((invoice) => {
            if (invoice.createdDate && invoice.totalPrice !== undefined) {
                const date = this.convertStringToDate(invoice.createdDate);
                const formattedDate = this.formatDate(date);

                if (revenuePerDay.has(formattedDate)) {
                    revenuePerDay.set(formattedDate, revenuePerDay.get(formattedDate)! + invoice.totalPrice);
                } else {
                    revenuePerDay.set(formattedDate, invoice.totalPrice);
                }
            }
        });
        const sortedRevenuePerDay = new Map([...revenuePerDay.entries()].sort());

        return sortedRevenuePerDay;
    }

    convertStringToDate(dateString: string): Date {
        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        return new Date(year, month, day);
    }

    formatDate(date: Date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    private getDateRange(startDate: Date, endDate: Date): Date[] {
        const dateRange: Date[] = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dateRange.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateRange;
    }
}
