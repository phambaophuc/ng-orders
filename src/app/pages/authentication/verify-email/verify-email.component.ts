import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
    selector: 'app-verify-email',
    standalone: true,
    imports: [CommonModule, SharedModule, RouterModule],
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {

    constructor(public authService: AuthService) { }

    sendVerificationMail() {
        this.authService.sendVerificationMail();
    }
}
