import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import 'hammerjs';
import 'mousetrap';

// bootstrap import
import { NgbDropdownModule, NgbNavModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './components/card/card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DataFilterPipe } from './filter/data-filter.pipe';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoadingDotsComponent } from './components/loading-dots/loading-dots.component';
import { MapDialogComponent } from './components/map-dialog/map-dialog.component';


@NgModule({
    declarations: [
        DataFilterPipe,
        SpinnerComponent,
        LoadingDotsComponent,
        MapDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardComponent,
        BreadcrumbComponent,
        NgScrollbarModule,
        NgClickOutsideDirective,
        NgbDropdownModule,
        NgbNavModule,
        NgbModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardComponent,
        LoadingDotsComponent,
        BreadcrumbComponent,
        DataFilterPipe,
        SpinnerComponent,
        NgbModule,
        NgbDropdownModule,
        NgbNavModule,
        NgScrollbarModule,
        NgClickOutsideDirective
    ]
})
export class SharedModule { }
