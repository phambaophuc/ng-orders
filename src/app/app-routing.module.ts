import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { DashAnalyticsComponent } from './pages/dashboard/dash-analytics/dash-analytics.component';
import { SamplePageComponent } from './pages/sample-page/sample-page.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: '/analytics',
                pathMatch: 'full'
            },
            {
                path: 'analytics',
                component: DashAnalyticsComponent
            },
            {
                path: 'sample-page',
                component: SamplePageComponent
            }
        ]
    },
    {
        path: '',
        component: GuestComponent,
        children: []
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
