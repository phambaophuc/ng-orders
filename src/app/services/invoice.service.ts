import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Invoice } from '../common/invoice';
import { Observable, map } from 'rxjs';
import { isThisMonth } from 'date-fns';
import * as XLSX from 'xlsx';


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

    // Thống kê theo khoảng thời gian
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

    private getDateRange(startDate: Date, endDate: Date): Date[] {
        const dateRange: Date[] = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dateRange.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateRange;
    }

    // Thống kê theo ngày
    calculateTotalRevenuePerDay(invoices: Invoice[]): Map<string, number> {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const revenuePerMonth = new Map<string, number>();
        // Tạo một danh sách các ngày trong khoảng thời gian được chọn
        const dateRange: Date[] = this.getDateRange(startOfMonth, currentDate);

        dateRange.forEach(date => {
            revenuePerMonth.set(this.formatDate(date), 0);
        });

        invoices.forEach((invoice) => {
            if (invoice.createdDate && invoice.totalPrice !== undefined) {
                const date = this.convertStringToDate(invoice.createdDate);
                if (date >= startOfMonth && date <= currentDate) {
                    const formattedDate = this.formatDate(date);

                    if (revenuePerMonth.has(formattedDate)) {
                        revenuePerMonth.set(formattedDate, revenuePerMonth.get(formattedDate)! + invoice.totalPrice);
                    } else {
                        revenuePerMonth.set(formattedDate, invoice.totalPrice);
                    }
                }
            }
        });
        const sortedRevenuePerMonth = new Map([...revenuePerMonth.entries()].sort());

        return sortedRevenuePerMonth;
    }

    calculateTotalRevenuePerMonth(invoices: Invoice[], selectedYear: number): Map<string, number> {
        const revenuePerMonth = new Map<string, number>();

        // Khởi tạo giá trị cho tất cả các tháng trong năm là 0
        for (let month = 1; month <= 12; month++) {
            const formattedMonth = this.formatMonth(month);
            const key = `${formattedMonth}/${selectedYear}`;
            revenuePerMonth.set(key, 0);
        }

        invoices.forEach((invoice) => {
            const invoiceYear = this.convertStringToDate(invoice.createdDate!).getFullYear();

            if (invoiceYear === selectedYear) {
                const month = this.convertStringToDate(invoice.createdDate!).getMonth() + 1;
                const formattedMonth = this.formatMonth(month);
                const key = `${formattedMonth}/${selectedYear}`;

                // Cập nhật giá trị doanh thu cho tháng tương ứng
                revenuePerMonth.set(key, revenuePerMonth.get(key)! + (invoice.totalPrice || 0));
            }
        });

        return revenuePerMonth;
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

    private formatMonth(month: number): string {
        return month < 10 ? `0${month}` : `${month}`;
    }

}
