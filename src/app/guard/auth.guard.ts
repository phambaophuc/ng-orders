import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard {

    constructor(public authService: AuthService, public router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
        if (this.authService.isLoggedIn !== true) {
            this.router.navigate(['/auth/sign-in']);
        }

        return this.authService.getCurrentUser().pipe(
            take(1), map((user: any) => {
                if (!user || !user.shopId) {
                    this.router.navigate(['/register-shop']);
                    return false;
                }
                return true;
            })
        );
    }
}
