import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthAdminGuard {

    constructor(public authService: AuthService, public router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
        return this.authService.getCurrentUser().pipe(
            take(1),
            map((user: any) => {
                if (!user.isAdmin) {
                    this.router.navigate(['/auth/sign-in']);
                    return false;
                }
                return true;
            })
        );
    }
}