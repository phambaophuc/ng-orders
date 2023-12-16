import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-chat-user-list',
    templateUrl: './chat-user-list.component.html',
    styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent implements OnInit {

    @Output() ChatCollapse = new EventEmitter();
    @Output() ChatToggle = new EventEmitter();
    searchFriends!: string;

    users: any[] = [];

    constructor(private userService: UserService, private authService: AuthService) { }

    ngOnInit(): void {
        this.getUsersChat();
    }

    getUsersChat() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.userService.getUsersByMessagesKeySuffix(user.shopId)
                    .subscribe((users: any) => {
                        this.users = users;
                    })
            }
        )
    }

    ChatOn(friendKey: string) {
        this.ChatToggle.emit(friendKey);
    }
}
