import { Injectable } from '@angular/core';
import { Shop } from '../common/shop';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    private baseObject = 'Shops';
    private shopRef: AngularFireList<Shop>;

    constructor(private db: AngularFireDatabase) {
        this.shopRef = db.list(this.baseObject);
    }

    getAllShops(): Observable<any> {
        return this.shopRef.snapshotChanges().pipe(
            map(changes => changes.map(
                c => ({ key: c.payload.key, ...c.payload.val() })
            ))
        );
    }

    addShop(newShop: Shop): Promise<any> {
        const foodKey = this.shopRef.push(null!).key;
        newShop.ratingScore = 0;
        return this.db.object(`${this.baseObject}/${foodKey}`).set(newShop);
    }

    deleteShop(key: string): Promise<any> {
        return this.shopRef.remove(key);
    }

    updateFood(key: string, updatedShop: any): Promise<any> {
        return this.shopRef.update(key, updatedShop);
    }

    getShopByKey(key: string): Observable<any> {
        return this.db.object(`/${this.baseObject}/${key}`).valueChanges();
    }
}
