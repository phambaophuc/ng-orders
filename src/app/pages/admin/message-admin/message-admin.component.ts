import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-message-admin',
    templateUrl: './message-admin.component.html',
    styleUrls: ['./message-admin.component.scss']
})
export class MessageAdminComponent {

    currentUser: any;
    users: any[] = [];
    user: any;

    messages: any[] = [];

    constructor(
        private userService: UserService,
        private chatService: ChatService,
        private authService: AuthService
    ) {
        this.getUsersShop();
    }

    getUsersShop() {
        this.userService.getUsers().subscribe(
            (users) => {
                this.users = users.filter(user => user.shopId);
            }
        );
    }

    getChatMessage() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.currentUser = user;
                this.chatService.getMessages(user.uid, this.user?.shopId)
                    .subscribe((messages) => {
                        this.messages = messages;
                    });
            }
        );
    }

    changeUserId(user: any) {
        this.user = user;
        this.getChatMessage();
    }
}
