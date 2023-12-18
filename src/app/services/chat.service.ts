import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private db: AngularFireDatabase) { }

    getMessages(userId: string, shopId: string) {
        const chatId = `${userId}_${shopId}`;
        return this.db.list(`Messages/${chatId}`).valueChanges();
    }

    sendMessage(message: any) {
        const chatId = `${message.receiverID}_${message.senderID}`;
        this.db.list(`Messages/${chatId}`).push(message);
    }
}
