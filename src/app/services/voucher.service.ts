import { Injectable } from '@angular/core';
import { Voucher } from '../common/voucher';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VoucherService {

    private voucherRef: AngularFireList<Voucher>;

    constructor(private db: AngularFireDatabase) {
        this.voucherRef = db.list('Vouchers');
    }

    getVouchersByShopId(shopId: string): Observable<any[]> {
        return this.db.list(`Vouchers`, ref => ref.orderByChild('shopId').equalTo(shopId))
            .snapshotChanges()
            .pipe(map(changes => changes.map(c => {
                const data = c.payload.val();
                const key = c.payload.key;
                return { key, ...(data ? data : {}) };
            })));
    }

    createVoucher(newVoucher: Voucher): Promise<any> {
        const key = this.voucherRef.push(null!).key;
        return this.db.object(`Vouchers/${key}`).set(newVoucher);
    }

    deleteVoucher(key: string): Promise<void> {
        return this.voucherRef.remove(key);
    }
}
