import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Order } from '../common/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orderRef: AngularFireList<Order>;

    constructor(private db: AngularFireDatabase) {
        this.orderRef = db.list('Orders');
    }

    getAllOrders(): Observable<any> {
        return this.orderRef.snapshotChanges().pipe(
            map(changes => changes.map(
                c => ({ key: c.payload.key, ...c.payload.val() })
            ))
        );
    }

    getOrdersByShopId(shopId: string): Observable<any[]> {
        return this.db.list('Orders', ref => ref.orderByChild('shopId').equalTo(shopId))
            .snapshotChanges()
            .pipe(map(changes => changes.map(c => {
                const data = c.payload.val();
                const key = c.payload.key;
                return { key, ...(data ? data : {}) };
            })));
    }


}
