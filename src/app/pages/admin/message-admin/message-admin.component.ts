import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-message-admin',
    templateUrl: './message-admin.component.html',
    styleUrls: ['./message-admin.component.scss']
})
export class MessageAdminComponent implements OnInit, AfterViewChecked {

    @ViewChild('scrollChat', { static: false }) scrollChat!: ElementRef;

    user: any;
    users: any[] = [];
    currentUser: any;

    messages: any[] = [];
    message!: string;

    private doScroll = false;

    constructor(
        private userService: UserService,
        private chatService: ChatService,
        private authService: AuthService,
        private shopService: ShopService
    ) { }

    ngOnInit(): void {
        this.getUsersShop();
    }

    ngAfterViewChecked(): void {
        if (this.doScroll) {
            this.scrollToBottom();
            this.doScroll = false;
        }
    }

    getUsersShop() {
        this.userService.getUsers().subscribe((users) => {
            this.shopService.getAllShops().subscribe((shops) => {
                this.users = users.filter(user => user.shopId)
                    .map(user => {
                        const shop = shops.find((shop: any) => shop.key === user.shopId);
                        return {
                            ...user,
                            shopName: shop ? shop.shopName : '',
                            shopImage: shop ? shop.shopImage : '',
                        };
                    });
            });
        });
    }


    getChatMessage() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.currentUser = user;
                this.chatService.getMessages(user.uid, this.user?.shopId)
                    .subscribe((messages) => {
                        this.messages = messages;
                        this.doScroll = true;
                    });
            }
        );
    }

    changeUserId(user: any) {
        this.user = user;
        this.getChatMessage();
    }

    sentMsg() {
        const message = {
            message: this.message,
            senderID: this.currentUser.uid,
            receiverID: this.user.shopId,
            timestamp: Date.now(),
        };
        this.chatService.sendMessageAdmin(message).then(() => {
            this.scrollToBottom();
            this.message = '';
        });
    }

    scrollToBottom() {
        if (this.scrollChat) {
            const element = this.scrollChat.nativeElement;
            element.scrollTop = element.scrollHeight;
        }
    }
}
