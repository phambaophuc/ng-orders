import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [CommonModule, SharedModule, RouterModule, MatIconModule],
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

    constructor(private authService: AuthService) { }

    signIn(email: string, password: string) {
        this.authService.signIn(email, password);
    }

    signInWithGoogle() {
        this.authService.signInWithGoogle();
    }
}
