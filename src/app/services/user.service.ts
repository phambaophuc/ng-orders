import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, combineLatest, map, switchMap } from 'rxjs';

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

    // Lấy các user đang chat với cửa hàng
    getUsersByMessagesKeySuffix(suffix: string): Observable<any[]> {
        return this.db.list('Messages').snapshotChanges().pipe(
            map((messages) => messages
                .filter((message: any) => message.key.endsWith(`_${suffix}`))
                .map((message) => {
                    const key = message.key;
                    const data = message.payload.val();
                    if (typeof data === 'object' && data !== null) {
                        return { key, ...data };
                    }
                    return { key };
                })
            ),
            switchMap((filteredMessages) => {
                // Lấy danh sách các keys từ filteredMessages
                const userKeys = filteredMessages.map((filteredMessage) => {
                    const messageKey = filteredMessage.key!;
                    const userKey = messageKey.slice(0, -2);
                    return userKey;
                });

                // Lấy dữ liệu từ Users với các keys đã thu thập
                const usersData = userKeys.map((userKey) => {
                    return this.db.object(`Users/${userKey}`).snapshotChanges().pipe(
                        map(userSnapshot => {
                            const data: any = userSnapshot.payload.val();
                            return { key: userSnapshot.payload.key, ...data };
                        })
                    );
                });

                // Kết hợp tất cả các Observable thành một Observable duy nhất
                return combineLatest(usersData) as Observable<any[]>;
            })
        );
    }
}
