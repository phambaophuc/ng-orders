import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-chat-msg',
    templateUrl: './chat-msg.component.html',
    styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent implements OnInit {

    @Input() friendId!: string;
    @Output() ChatToggle = new EventEmitter();
    @Output() messageSent = new EventEmitter<string>();
    @ViewChild('newChat', { read: ElementRef, static: false }) newChat!: ElementRef;
    // eslint-disable-next-line
    chatMessage: any;
    message!: string;
    message_error!: boolean;

    currentUser: any;
    users: any;

    constructor(
        private chatService: ChatService,
        private authService: AuthService
    ) {
        authService.getCurrentUser().subscribe(
            (user: any) => {
                this.currentUser = user;
                chatService.getMessages(this.friendId, user.shopId)
                    .subscribe((chatMessage: any) => {
                        this.chatMessage = chatMessage;
                    });
            }
        );
    }

    ngOnInit(): void {
    }

    sentMsg(flag: number) {
        if (!this.message || this.message.trim() === '') {
            this.message_error = true;
        } else {
            if (flag === 1) {
                this.message_error = false;
            } else {
                this.message_error = false;
                const message = {
                    message: this.message,
                    senderId: this.currentUser.shopId,
                    receiverId: this.friendId,
                    timestamp: Date.now(),
                };
                this.chatService.sendMessage(message);
                this.messageSent.emit(this.message);
                this.message = '';
            }
        }
    }
}