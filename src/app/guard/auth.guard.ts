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
        return this.authService.getCurrentUser().pipe(
            take(1),
            map((user: any) => {
                if (!user.shopId && !user.isAdmin) {
                    this.router.navigate(['/register-shop']);
                    return false;
                }

                if (!this.authService.isLoggedIn) {
                    this.router.navigate(['/auth/sign-in']);
                    return false;
                }

                return true;
            })
        );
    }
}
