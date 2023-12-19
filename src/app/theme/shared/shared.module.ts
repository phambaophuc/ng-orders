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
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DateFormatPipe } from './filter/date-format.pipe';
import { TimeFormatPipe } from './filter/time-format.pipe';
import { MatInputModule } from '@angular/material/input';
import { InputDialogComponent } from './components/input-dialog/input-dialog.component';


@NgModule({
    declarations: [
        DataFilterPipe,
        SpinnerComponent,
        LoadingDotsComponent,
        MapDialogComponent,
        ConfirmDialogComponent,
        DateFormatPipe,
        TimeFormatPipe,
        InputDialogComponent
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
        NgbModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule
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
        NgClickOutsideDirective,
        DateFormatPipe,
        TimeFormatPipe
    ]
})
export class SharedModule { }
