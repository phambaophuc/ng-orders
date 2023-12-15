import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-chat-msg',
    templateUrl: './chat-msg.component.html',
    styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent implements AfterViewInit {

    @Input() friendId!: string;
    @Output() ChatToggle = new EventEmitter();
    @Output() messageSent = new EventEmitter<string>();

    @ViewChild('scrollbar', { static: false }) scrollbar!: NgScrollbar;
    @ViewChild('scrollContainer', { static: false }) scrollContainer!: NgScrollbar;

    chatMessage: any;
    message!: string;
    message_error!: boolean;

    currentUser: any;
    users: any;

    constructor(
        private chatService: ChatService,
        private authService: AuthService,
        private renderer: Renderer2
    ) {
        this.getMessages();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.scrollbar.scrollTo({ top: Number.MAX_SAFE_INTEGER, duration: 0 });
        }, 1000);
    }

    getMessages() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.currentUser = user;
                this.chatService.getMessages(this.friendId, user.shopId)
                    .subscribe((chatMessage: any) => {
                        this.chatMessage = chatMessage;
                    });
            }
        );
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
                    senderID: this.currentUser.shopId,
                    receiverID: this.friendId,
                    timestamp: Date.now(),
                };
                this.chatService.sendMessage(message);
                this.ngAfterViewInit();
                this.messageSent.emit(this.message);
                this.message = '';
            }
        }
    }
}