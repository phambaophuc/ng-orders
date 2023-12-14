import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-friend',
    templateUrl: './friend.component.html',
    styleUrls: ['./friend.component.scss']
})
export class FriendComponent {

    @Input() friends!: any;
    @Output() ChatOn = new EventEmitter();

    public innerChatToggle(friends: any) {
        this.ChatOn.emit(friends.key);
    }
}