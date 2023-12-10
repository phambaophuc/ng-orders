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
import { ChartComponent } from './pages/chart/chart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterShopComponent } from './pages/shop/register-shop/register-shop.component';

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
                path: 'chart',
                component: ChartComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'food',
                loadChildren: () => import('./pages/food/food.module').then(m => m.FoodModule)
            },
            {
                path: 'shop',
                loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule)
            },
            {
                path: 'order',
                loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
            },
            {
                path: 'invoice',
                loadChildren: () => import('./pages/invoice/invoice.module').then(m => m.InvoiceModule)
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
            },
            {
                path: 'register-shop',
                component: RegisterShopComponent
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
