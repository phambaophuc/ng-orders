import { animate, style, transition, trigger } from '@angular/animations';
import { Component, DoCheck, OnInit } from '@angular/core';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { GradientConfig } from 'src/app/app-config';
import { AuthService } from 'src/app/services/auth.service';

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
export class NavRightComponent implements DoCheck, OnInit {

    // public props
    visibleUserList: boolean;
    chatMessage: boolean;
    friendId!: string;
    gradientConfig = GradientConfig;

    user: any;
    isLoggedIn?: boolean;

    constructor(public authService: AuthService) {
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

    ngOnInit(): void {
        this.isLoggedIn = this.authService.isLoggedIn;
        this.getCurrentUser();
    }

    // public method
    onChatToggle(friendID: string) {
        this.friendId = friendID;
        this.chatMessage = !this.chatMessage;
    }

    signOut() {
        this.authService.signOut();
    }

    getCurrentUser() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.user = user;
            }
        );
    }
}
