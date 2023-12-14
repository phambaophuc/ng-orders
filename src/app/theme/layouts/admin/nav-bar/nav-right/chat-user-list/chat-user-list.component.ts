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
        this.userService.getUsers().subscribe((users: any) => {
            const currentUser = this.authService.getCurrentUser()
                .subscribe((currentUser: any) => {
                    this.users = users.filter((user: any) => user.uid !== currentUser.uid);
                });
        });
    }

    ChatOn(friendKey: string) {
        this.ChatToggle.emit(friendKey);
    }
}
