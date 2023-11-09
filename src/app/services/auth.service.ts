import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { User } from '../common/user';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userData: any;

    constructor(
        private afDb: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private router: Router,
        private ngZone: NgZone
    ) {
        this.afAuth.authState.subscribe(
            (user) => {
                if (user) {
                    this.userData = user;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    JSON.parse(localStorage.getItem('user')!);
                } else {
                    localStorage.setItem('user', 'null');
                    JSON.parse(localStorage.getItem('user')!);
                }
            }
        );
    }

    // sign in with email/password
    SignIn(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.SetUserData(result.user);
                this.afAuth.authState.subscribe((user) => {
                    if (user) {
                        this.router.navigate(['/dashboard']);
                    }
                });
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    // sign up with email/password
    SignUp(email: string, password: string) {
        return this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.SendVerificationMail();
                this.SetUserData(result.user);
            })
            .catch((error) => {
                window.alert(error.message);
            })
    }

    // send email verfificaiton when new user sign up
    SendVerificationMail() {
        return this.afAuth.currentUser
            .then((u: any) => u.sendEmailVerification())
            .then(() => {
                this.router.navigate(['/auth/verify-email']);
            })
    }

    // reset Forggot password
    ForgotPassword(password: string) {
        return this.afAuth
            .sendPasswordResetEmail(password)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            })
            .catch((error) => {
                window.alert(error);
            });
    }

    // returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user !== null && user.emailVerified !== false ? true : false;
    }

    SetUserData(user: any) {
        const userRef = this.afDb.object(`Users/${user.uid}`);

        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
        };

        return userRef.set(userData);
    }

    // signout
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['/auth/sign-in']);
        })
    }
}
