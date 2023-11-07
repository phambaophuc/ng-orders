import { animate, style, transition, trigger } from '@angular/animations';
import { Component, DoCheck } from '@angular/core';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { GradientConfig } from 'src/app/app-config';

@Component({
    selector: 'app-nav-right',
    templateUrl: './nav-right.component.html',
    styleUrls: ['./nav-right.component.scss'],
    providers: [NgbDropdownConfig],
    animations: [
        trigger('slideInOutLeft', [
            transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
            transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
        ]),
        trigger('slideInOutRight', [
            transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
            transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
        ])
    ]
})
export class NavRightComponent implements DoCheck {

    // public props
    visibleUserList: boolean;
    chatMessage: boolean;
    friendId!: number;
    gradientConfig = GradientConfig;

    constructor() {
        this.visibleUserList = false;
        this.chatMessage = false;
    }

    ngDoCheck(): void {
        if (document.querySelector('body')?.classList.contains('elite-rtl')) {
            this.gradientConfig.isRtlLayout = true;
        } else {
            this.gradientConfig.isRtlLayout = false;
        }
    }

    // public method
    onChatToggle(friendID: number) {
        this.friendId = friendID;
        this.chatMessage = !this.chatMessage;
    }
}
