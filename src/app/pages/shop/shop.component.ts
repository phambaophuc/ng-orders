import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

    isAdmin: boolean = false;

    constructor(private authService: AuthService) {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                if (user.isAdmin) {
                    this.isAdmin = true;
                }
            }
        )
    }
}
