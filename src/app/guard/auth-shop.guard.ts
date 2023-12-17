import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthShopGuard {

    constructor(public authService: AuthService, public router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/auth/sign-in']);
        }

        return this.authService.getCurrentUser().pipe(
            take(1),
            map((user: any) => {
                if (user.isAdmin) {
                    this.router.navigate(['/dashboard']);
                    return false;
                }

                if (user.shopId) {
                    this.router.navigate(['/dashboard']);
                    return false;
                }

                return true;
            })
        );
    }
}
