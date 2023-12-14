import { Component, EventEmitter, NgIterable, OnInit, Output } from '@angular/core';
import { FriendsList } from 'src/app/fack-db/friends-list';
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

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getUsers().subscribe((users: any) => {
            this.users = users;
        });
    }

    ChatOn(friendKey: string) {
        this.ChatToggle.emit(friendKey);
    }
}
