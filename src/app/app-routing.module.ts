import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { DashAnalyticsComponent } from './pages/dashboard/dash-analytics/dash-analytics.component';
import { SignInComponent } from './pages/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './pages/authentication/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/authentication/verify-email/verify-email.component';
import { AuthGuard } from './guard/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ForgotPasswordComponent } from './pages/authentication/forgot-password/forgot-password.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashAnalyticsComponent
            },
            {
                path: 'food',
                loadChildren: () => import('./pages/food/food.module').then(m => m.FoodModule)
            }
        ]
    },
    {
        path: '',
        component: GuestComponent,
        children: [
            {
                path: 'auth/sign-in',
                component: SignInComponent
            },
            {
                path: 'auth/sign-up',
                component: SignUpComponent
            },
            {
                path: 'auth/verify-email',
                component: VerifyEmailComponent
            },
            {
                path: 'auth/forgot-password',
                component: ForgotPasswordComponent
            }
        ]
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
