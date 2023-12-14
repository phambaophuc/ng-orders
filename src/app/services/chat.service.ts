import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private db: AngularFireDatabase) { }

    getMessages(receiverId: string, senderId: string) {
        const chatId = `${receiverId}_${senderId}`;
        return this.db.list(`Messages/${chatId}`).valueChanges();
    }

    sendMessage(message: any) {
        const chatId = `${message.receiverId}_${message.senderId}`;
        this.db.list(`Messages/${chatId}`).push(message);
    }
}
