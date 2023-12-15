import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private db: AngularFireDatabase) { }

    getUsers(): Observable<any[]> {
        return this.db.list('Users').snapshotChanges().pipe(
            map(changes => changes.map(c => {
                const data = c.payload.val();
                return { key: c.payload.key, ...(data ? data : {}) };
            }))
        );
    }

    getUserByKey(key: string): Observable<any> {
        return this.db.object(`Users/${key}`).snapshotChanges().pipe(
            map(snapshot => {
                const data: any = snapshot.payload.val();
                return { key: snapshot.payload.key, ...data };
            })
        );
    }
}
