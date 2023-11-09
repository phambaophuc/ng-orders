import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, SharedModule, RouterModule],
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

    constructor(private authService: AuthService) { }

    signUp(email: string, password: string) {
        this.authService.SignUp(email, password);
    }
}
