import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Invoice } from '../common/invoice';
import { Observable, map } from 'rxjs';

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
}
