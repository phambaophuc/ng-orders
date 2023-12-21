import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    currentMessage = new BehaviorSubject<any>(null);

    constructor() { }

    async requestPermission(): Promise<string | null> {
        const messaging = getMessaging();
        try {
            const currentToken = await getToken(messaging, { vapidKey: environment.firebaseConfig.vapidKey });
            
            if (currentToken) {
                return currentToken;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    listen() {
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            this.currentMessage.next(payload);
        });
    }
}
