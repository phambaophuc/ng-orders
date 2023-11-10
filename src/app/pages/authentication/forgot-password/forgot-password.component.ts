import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [CommonModule, SharedModule, RouterModule],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

    constructor(private authService: AuthService) { }

    forgotPassword(email: string) {
        this.authService.forgotPassword(email);
    }
}