import { Injectable } from '@angular/core';
import { Shop } from '../common/shop';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Section } from '../common/section';

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

    updateShop(key: string, updatedShop: any): Promise<any> {
        return this.shopRef.update(key, updatedShop);
    }

    getShopByKey(key: string): Observable<any> {
        return this.db.object(`${this.baseObject}/${key}`).snapshotChanges().pipe(
            map(snapshot => {
                const data: any = snapshot.payload.val();
                return { key: snapshot.payload.key, ...data };
            })
        );
    }

    getSectionShop(key: string): Observable<any> {
        const sectionRef = this.db.list(`${this.baseObject}/${key}/sections`);

        return sectionRef.snapshotChanges().pipe(
            map(changes => changes.map(
                c => ({ key: c.payload.key, ...c.payload.val() as Section })
            ))
        );
    }

    addSectionShop(shop: Shop, section: Section) {
        if (!shop.sections) {
            shop.sections = [section];
        } else {
            shop.sections.push(section);
        }

        return this.shopRef.update(shop.key!, shop);
    }

    deleteSectionShop(shop: Shop, section: Section) {
        if (shop.sections) {
            shop.sections = shop.sections.filter(sec => sec !== section);
        }

        return this.shopRef.update(shop.key!, shop);
    }
}
