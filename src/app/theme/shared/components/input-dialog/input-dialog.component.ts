import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-input-dialog',
    templateUrl: './input-dialog.component.html',
    styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string, inputValue: string }
    ) { }
}
