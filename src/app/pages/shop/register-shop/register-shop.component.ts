import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Shop } from 'src/app/common/shop';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
    selector: 'app-register-shop',
    templateUrl: './register-shop.component.html',
    styleUrls: ['./register-shop.component.scss']
})
export class RegisterShopComponent {

    signUpShopForm: FormGroup = new FormGroup({});

    newShop: Shop = new Shop();
    isRegisterShop: boolean = false;

    constructor(
        private shopService: ShopService,
        public authService: AuthService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.signUpShopForm = this.fb.group({
            shopName: new FormControl('', [Validators.required]),
            shopAddress: new FormControl('', [Validators.required])
        })
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                if (user.shopId) {
                    this.isRegisterShop = true;
                }
            }
        )
    }

    get shopName() { return this.signUpShopForm.get('shopName'); }
    get shopAddress() { return this.signUpShopForm.get('shopAddress'); }

    onSubmit() {
        this.newShop.shopName = this.shopName?.value;
        this.newShop.shopAddress = this.shopAddress?.value;
        this.shopService.createShop(this.newShop)
            .then((data) => {
                this.authService.getCurrentUser().subscribe(
                    (user: any) => {
                        this.authService.updateUserShop(user, data.key);
                        this.router.navigate(['/dashboard']);
                    }
                )
            })
            .catch(error => {
                console.error(error);
            });
    }
}
